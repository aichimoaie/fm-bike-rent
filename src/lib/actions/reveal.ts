/**
 * Scroll-reveal action, mirrors the reference site's IntersectionObserver
 * mechanism (js/main.js initReveal): threshold 0.1, rootMargin "0px 0px -50px 0px",
 * adds "visible" once and stops observing.
 */
export function reveal(node: HTMLElement) {
	node.classList.add('reveal');

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
