import { KINDS } from "./Input/kinds";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	title?: string;
	async?: boolean;
	err?: string;
	loading?: boolean;
	success?: boolean;
	kind?: keyof typeof KINDS;
}
