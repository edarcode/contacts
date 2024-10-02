import css from "./css.module.css";
import { joinClass } from "./utils/joinClass";
import { Props } from "./types";
import { KINDS } from "./kinds";
import Arrow from "./icons/Arrow";

export default function IconBtn(props: Props) {
  const { isVisible = true, kind, className, Icon, ...extraProps } = props;

  const finalClass = joinClass([css.btn, className, KINDS[kind ?? "primary"]]);

  if (!isVisible) return null;
  return (
    <button {...extraProps} className={finalClass}>
      {Icon ? <Icon className={css.icon} /> : <Arrow className={css.icon} />}
    </button>
  );
}
