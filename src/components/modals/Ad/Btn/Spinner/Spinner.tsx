import css from "./css.module.css";

export default function Spinner({ loading }: Props) {
	if (!loading) return null;
	return <div className={css.spinner}></div>;
}

type Props = {
	loading?: boolean;
};
