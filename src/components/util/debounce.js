//create debouce method outside of the component

/**
 *
 * @returns debounce function
 */
export const createDebounce = () => {
	let timeout;

	const setClosedTimeout = (cb, time) => {
		clearTimeout(timeout);
		timeout = setTimeout(cb, time);
	};

	/**
	 * @param function, callback - debounced and executed
	 * @param number, time in ms
	 * @param function, *optional callback - executes on every call (not debounced)
	 */
	const debounce = (cb, time, optCb) => {
		if (optCb) optCb();
		setClosedTimeout(cb, time);
	};

	return debounce;
};
