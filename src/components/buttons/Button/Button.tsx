import css from "./css.module.css";
import { joinClass } from "./utils/joinClass";
import { Props } from "./types";
import { BTN_KIND } from "./kinds";
import Spinner from "./Spinner/Spinner";

export default function Button(props: Props) {
  const {
    isVisible = true,
    kind,
    className,
    loading,
    err,
    children,
    ...extraProps
  } = props;

  const finalClass = joinClass([
    css.btn,
    className,
    err && css.err,
    loading && css.loading,
    BTN_KIND[kind ?? "primary"],
  ]);

  if (!isVisible) return null;
  return (
    <button {...extraProps} className={finalClass}>
      {!loading && children}
      <Spinner loading={loading} />
    </button>
  );
}
