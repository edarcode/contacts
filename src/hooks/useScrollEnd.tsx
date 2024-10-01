import { useEffect, useState } from "react";

export function useScrollEnd(offset = 100) {
	const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.innerHeight + window.scrollY;
			const documentHeight = document.documentElement.offsetHeight;

			if (documentHeight - scrollPosition <= offset) {
				setIsScrollAtEnd(true);
			} else {
				setIsScrollAtEnd(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [offset]);

	return isScrollAtEnd;
}
