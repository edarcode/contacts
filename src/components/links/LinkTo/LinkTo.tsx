import { NavLink } from "react-router-dom";
import css from "./css.module.css";

export default function LinkTo({ to, children }: Props) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? css.active : css.link)}
		>
			{children}
		</NavLink>
	);
}

type Props = {
	to: string;
	children: string;
};
