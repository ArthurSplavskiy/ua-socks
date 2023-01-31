declare global {
	interface Window {
		onmousewheel: any;
	}
	interface Document {
		onmousewheel: any;
	}
}

export const useScroll = (): { disableScroll: () => void; enableScroll: () => void } => {
	function preventDefault(e: any) {
		e = e || window.event;
		if (e.preventDefault) e.preventDefault();
		e.returnValue = false;
	}
	function preventDefaultForScrollKeys(e: any) {
		/*if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}*/
	}
	const disableScroll = () => {
		if (window.addEventListener)
			// older FF
			window.addEventListener('DOMMouseScroll', preventDefault, false);
		document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove = preventDefault; // mobile
		document.onkeydown = preventDefaultForScrollKeys;
	};
	const enableScroll = () => {
		if (window.removeEventListener)
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
		document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	};

	return { disableScroll, enableScroll };
};
