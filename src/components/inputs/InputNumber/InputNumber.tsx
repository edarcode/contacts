import css from "./css.module.css";
import { KINDS } from "./kinds";
import { Props } from "./types";
import { joinClass } from "./utils/joinClass";

export default function InputNumber(props: Props) {
	const { className, title, kind, ...extraProps } = props;

	const finalClass = joinClass([css.label, className]);
	const finalClassInput = joinClass([
		css.input,
		kind ? KINDS[kind] : KINDS["primary"]
	]);

	return (
		<label className={finalClass}>
			{title && <span className={css.title}>{title}</span>}
			<input
				placeholder="Núm"
				{...extraProps}
				type="number"
				className={finalClassInput}
			/>
		</label>
	);
}
