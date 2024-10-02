import { joinClass } from "../../../utils/joinClass";
import css from "./css.module.css";

export default function Hyperlink(props: Props) {
  const {
    className,
    href,
    children,
    target = "_blank",
    rel = "noopener noreferrer",
    ...extraProps
  } = props;

  const finalClass = joinClass([css.link, className]);

  return (
    <a
      {...extraProps}
      href={href}
      className={finalClass}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

type Props = {
  className?: string;
  href: string;
  children: string;
  target?: string;
  rel?: string;
};
