import { joinClass } from "../utils/joinClass";
import State from "../State/State";
import css from "./css.module.css";
import { KINDS } from "./kinds";

export default function Input(props: Props) {
	const { async, err, loading, success, kind, ...extraProps } = props;

	const finalClassInput = joinClass([
		css.input,
		err && css.input__err,
		async && (err || loading || success) && css.input__state,
		css[kind ?? "primary"]
	]);

	return (
		<label className={css.label}>
			<input
				placeholder="🔍"
				{...extraProps}
				type="text"
				className={finalClassInput}
			></input>
			<State async={async} err={err} loading={loading} success={success} />
		</label>
	);
}

interface Props {
	async?: boolean;
	err?: string;
	loading?: boolean;
	success?: boolean;
	kind?: keyof typeof KINDS;
}
