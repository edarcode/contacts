import css from "./css.module.css";
import Check from "./icons/Check.js";
import { joinClass } from "./utils/joinClass.js";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	title?: string;
}

export default function InputCheckbox(props: Props) {
	const { className, title, ...extraProps } = props;
	const finalClassName = joinClass([css.label, className]);
	return (
		<label className={finalClassName}>
			<input {...extraProps} type="checkbox" className={css.checkbox} />
			<span className={css.fakeCheckbox}>
				<Check className={css.icon} />
			</span>
			{title}
		</label>
	);
}
