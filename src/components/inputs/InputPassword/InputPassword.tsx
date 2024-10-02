import { forwardRef } from "react";
import css from "./css.module.css";
import Input from "./Input/Input";
import { Props } from "./types";
import { joinClass } from "./utils/joinClass";

export default forwardRef(function InputPassword(props: Props, ref: any) {
  const { className, err, ...extraProps } = props;

  const finalClassName = joinClass([css.label, className]);

  return (
    <label className={finalClassName}>
      <Input {...extraProps} ref={ref} err={err} />
      {err && <span className={css.err}>{err}</span>}
    </label>
  );
});
