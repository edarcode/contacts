import css from "./css.module.css";
import Arrow from "./icons/Arrow.js";
import { KINDS } from "./kinds.js";
import { joinClass } from "./utils/joinClass.js";

export default function Select(props: Props) {
	const { className, opt, kind, title, ...extraProps } = props;

	const finalClass = joinClass([css.label, className]);
	const finalClassSelect = joinClass([css.select, KINDS[kind ?? "primary"]]);

	return (
		<label className={finalClass}>
			{title && <span className={css.title}>{title}</span>}
			<label className={css.wrapper_select}>
				<select {...extraProps} className={finalClassSelect}>
					{opt.map(item => (
						<option key={item.value} value={item.value}>
							{item.display}
						</option>
					))}
				</select>
				<Arrow className={css.arrow} />
			</label>
		</label>
	);
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	opt: { value: any; display: string }[];
	kind?: keyof typeof KINDS;
	title?: string;
}
