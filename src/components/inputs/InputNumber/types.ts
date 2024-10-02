import { KINDS } from "./kinds";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	title?: string;
	kind?: keyof typeof KINDS;
}
