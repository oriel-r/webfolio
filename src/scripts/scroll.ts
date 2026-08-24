let activeScrollController: AbortController | null = null;

export function initScroll() {
	if (activeScrollController) {
		activeScrollController.abort();
		activeScrollController = null;
	}

	const scrollContainer = document.getElementById("scroll-container");
	if (!scrollContainer) return;

	const controller = new AbortController();
	activeScrollController = controller;
	const { signal } = controller;

	const sections = Array.from(
		scrollContainer.querySelectorAll<HTMLElement>("section"),
	);
	let currentIndex = 0;
	let isScrolling = false;

	function isDesktop() {
		return window.innerWidth >= 768;
	}

	function getMobileSectionIndex(): number {
		const scrollTop = scrollContainer.scrollTop;
		let activeIndex = 0;

		sections.forEach((section, index) => {
			if (section.offsetTop <= scrollTop + 1) {
				activeIndex = index;
			}
		});

		return activeIndex;
	}

	function isInsideScrollableSection(direction: 1 | -1): boolean {
		const section = sections[currentIndex];
		if (!section || section.offsetHeight <= scrollContainer.clientHeight) {
			return false;
		}

		const scrollTop = scrollContainer.scrollTop;
		const sectionStart = section.offsetTop;
		const sectionEnd = sectionStart + section.offsetHeight;

		if (direction > 0) {
			return scrollTop + scrollContainer.clientHeight < sectionEnd - 1;
		}

		return scrollTop > sectionStart + 1;
	}

	function emitSectionChange(index: number) {
		window.dispatchEvent(
			new CustomEvent("sectionChange", { detail: { index } }),
		);
	}

	function getIndexFromHash(): number {
		const hash = window.location.hash.replace("#", "");
		if (!hash) return 0;
		const idx = sections.findIndex((s) => s.id === hash);
		return idx >= 0 ? idx : 0;
	}

	function syncHash(index: number) {
		const target = `#${sections[index].id}`;
		if (window.location.hash !== target) {
			history.replaceState(history.state, "", target);
		}
	}

	function scrollToSection(index: number, animate = true) {
		if (index < 0 || index >= sections.length) return;
		if (isScrolling && index === currentIndex) return;
		currentIndex = index;
		isScrolling = true;
		sections[index].scrollIntoView({
			behavior: animate ? "smooth" : "auto",
			inline: isDesktop() ? "start" : "nearest",
			block: isDesktop() ? "nearest" : "start",
		});
		syncHash(currentIndex);
		emitSectionChange(currentIndex);
		setTimeout(() => {
			isScrolling = false;
		}, 400);
	}

	if ("scrollRestoration" in history) {
		history.scrollRestoration = "manual";
	}

	scrollContainer.scrollTo(0, 0);
	const initialIndex = getIndexFromHash();
	if (initialIndex !== 0) {
		requestAnimationFrame(() => {
			scrollToSection(initialIndex, false);
		});
	} else {
		emitSectionChange(0);
	}

	// WHEEL: solo desktop
	scrollContainer.addEventListener(
		"wheel",
		(evt) => {
			if (!isDesktop()) return;
			evt.preventDefault();
			if (isScrolling) return;
			if (evt.deltaY > 0) {
				scrollToSection(
					Math.min(currentIndex + 1, sections.length - 1),
				);
			} else if (evt.deltaY < 0) {
				scrollToSection(Math.max(currentIndex - 1, 0));
			}
		},
		{ passive: false, signal },
	);

	document.addEventListener(
		"keydown",
		(evt) => {
			if (isScrolling) return;
			if (isDesktop()) {
				if (evt.key === "ArrowRight") {
					evt.preventDefault();
					scrollToSection(
						Math.min(currentIndex + 1, sections.length - 1),
					);
				} else if (evt.key === "ArrowLeft") {
					evt.preventDefault();
					scrollToSection(Math.max(currentIndex - 1, 0));
				}
			} else {
				if (evt.key === "ArrowDown") {
					if (isInsideScrollableSection(1)) return;
					evt.preventDefault();
					scrollToSection(
						Math.min(currentIndex + 1, sections.length - 1),
					);
				} else if (evt.key === "ArrowUp") {
					if (isInsideScrollableSection(-1)) return;
					evt.preventDefault();
					scrollToSection(Math.max(currentIndex - 1, 0));
				}
			}
		},
		{ signal },
	);

	// SCROLL: detecta la sección más cercana
	scrollContainer.addEventListener(
		"scroll",
		() => {
			if (isScrolling) return;

			let closest = 0;
			let minDist = Infinity;

			if (isDesktop()) {
				const scrollLeft = scrollContainer.scrollLeft;
				sections.forEach((section, i) => {
					const dist = Math.abs(section.offsetLeft - scrollLeft);
					if (dist < minDist) {
						minDist = dist;
						closest = i;
					}
				});
			} else {
				closest = getMobileSectionIndex();
			}

			if (closest !== currentIndex) {
				currentIndex = closest;
				syncHash(currentIndex);
				emitSectionChange(currentIndex);
			}
		},
		{ passive: true, signal },
	);

	window.addEventListener(
		"navClick",
		((e: CustomEvent) => {
			scrollToSection(e.detail.index);
		}) as EventListener,
		{ signal },
	);

	window.addEventListener(
		"popstate",
		() => {
			const idx = getIndexFromHash();
			if (idx !== currentIndex) {
				scrollToSection(idx);
			}
		},
		{ signal },
	);
}
