import { BTN_KIND } from "./kinds";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	kind?: keyof typeof BTN_KIND;
	isVisible?: boolean;
	loading?: boolean;
	err?: boolean;
}
