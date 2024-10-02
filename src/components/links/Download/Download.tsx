import css from "./css.module.css";
import Err from "./Err/Err";
import Spinner from "./Spinner/Spinner";
import { joinClass } from "./utils/joinClass";
import { Props } from "./types";
import { BTN_KIND } from "./kinds";

export default function Download(props: Props) {
	const {
		isVisible = true,
		kind,
		className,
		loading,
		err,
		children,
		download,
		href,
		...extraProps
	} = props;

	const finalClass = joinClass([
		css.link,
		className,
		err && css.link__err,
		BTN_KIND[kind ?? "primary"]
	]);

	if (!isVisible) return null;
	return (
		<a {...extraProps} className={finalClass} download={download} href={href}>
			{!loading && children}
			<Spinner loading={loading} />
			<Err err={err} />
		</a>
	);
}
