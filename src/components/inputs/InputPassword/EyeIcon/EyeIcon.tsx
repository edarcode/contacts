import css from "./css.module.css";
import ClosedEye from "./icons/ClosedEye";
import OpenEye from "./icons/OpenEye";

type Props = {
	isVisiblePass: boolean;
	hVisiblePass: () => void;
};

export default function EyeIcon(props: Props) {
	const { isVisiblePass, hVisiblePass } = props;
	if (!isVisiblePass)
		return <ClosedEye className={css.eye} onClick={hVisiblePass} />;
	return <OpenEye className={css.eye} onClick={hVisiblePass} />;
}
