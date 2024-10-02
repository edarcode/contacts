import Networks from "../../components/navs/Networks/Networks";
import css from "./css.module.css";

export default function Footer() {
	return (
		<footer className={css.footer}>
			<Networks />
			<p>© Casi todos los derechos reservados.</p>
		</footer>
	);
}
