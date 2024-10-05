import React from "react";
import { KINDS } from "./kinds";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	kind?: keyof typeof KINDS;
	isVisible?: boolean;
	Icon?: JSX.ElementType;
}
