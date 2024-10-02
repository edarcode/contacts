import { BTN_KIND } from "./kinds";

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	className?: string;
	kind?: keyof typeof BTN_KIND;
	isVisible?: boolean;
	loading?: boolean;
	err?: boolean;
	download: string;
	href: string;
}
