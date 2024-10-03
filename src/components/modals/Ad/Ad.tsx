import Btn from "./Btn/Btn";
import css from "./css.module.css";
import { joinClass } from "./utils/joinClass";

export default function Ad({ message, action, isVisible, className }: Props) {
  const finalClass = joinClass([css.ad, className]);

  if (!isVisible) return null;
  return (
    <div className={finalClass}>
      <p className={css.msg}>{message}</p>
      <Btn type="button" className={css.close} onClick={action}>
        Ok
      </Btn>
    </div>
  );
}

type Props = {
  message: string;
  action: () => void;
  isVisible: boolean;
  className?: string;
};
