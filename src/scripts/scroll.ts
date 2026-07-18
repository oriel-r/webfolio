export function initScroll() {
	const scrollContainer = document.getElementById("scroll-container");
	if (!scrollContainer) return;

	const sections = Array.from(
		scrollContainer.querySelectorAll<HTMLElement>("section"),
	);
	let currentIndex = 0;
	let isScrolling = false;

	function isDesktop() {
		return window.innerWidth >= 768;
	}

	function getScroller(): HTMLElement | Element {
		// En ambos viewports el scroller real es #scroll-container:
		// móvil: h-screen + overflow-y-scroll (snap-y); desktop: h-screen + overflow-x-scroll (snap-x).
		return scrollContainer;
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

	// WHEEL: solo desktop. En móvil el snap nativo (+ scroll-snap-stop:always)
	// gestiona el swipe una-sección-por-gesto; el wheel aquí ni siquiera dispararía
	// correctamente porque el scroller real es document.scrollingElement.
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
		{ passive: false },
	);

	document.addEventListener("keydown", (evt) => {
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
				evt.preventDefault();
				scrollToSection(
					Math.min(currentIndex + 1, sections.length - 1),
				);
			} else if (evt.key === "ArrowUp") {
				evt.preventDefault();
				scrollToSection(Math.max(currentIndex - 1, 0));
			}
		}
	});

	// SCROLL: detecta la sección más cercana y sincroniza estado/activo/navbar.
	// El scroller es #scroll-container en ambos viewports (snap-y móvil / snap-x desktop),
	// así este listener dispara tanto tras snap nativo (swipe) como tras scrollIntoView.
	const scroller = getScroller();
	scroller.addEventListener(
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
				const scrollTop = scroller.scrollTop;
				sections.forEach((section, i) => {
					const dist = Math.abs(section.offsetTop - scrollTop);
					if (dist < minDist) {
						minDist = dist;
						closest = i;
					}
				});
			}

			if (closest !== currentIndex) {
				currentIndex = closest;
				syncHash(currentIndex);
				emitSectionChange(currentIndex);
			}
		},
		{ passive: true },
	);

	window.addEventListener(
		"navClick",
		((e: CustomEvent) => {
			scrollToSection(e.detail.index);
		}) as EventListener,
	);

	window.addEventListener("popstate", () => {
		const idx = getIndexFromHash();
		if (idx !== currentIndex) {
			scrollToSection(idx);
		}
	});
}
