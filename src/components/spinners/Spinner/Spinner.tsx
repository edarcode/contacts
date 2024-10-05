import css from "./css.module.css";
import { joinClass } from "./utils/joinClass";

export default function Spinner({ className }: Props) {
  const finalClass = joinClass([css.spinner, className]);

  return <div className={finalClass}></div>;
}

type Props = {
  className?: string;
};
