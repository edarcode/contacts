import { joinClass } from "../utils/joinClass";
import State from "../State/State";
import css from "./css.module.css";
import { KINDS } from "./kinds";
import { forwardRef } from "react";

export default forwardRef(function Input(props: Props, ref: any) {
  const { async, err, loading, success, kind, ...extraProps } = props;

  const finalClassInput = joinClass([
    css.input,
    err && css.input__err,
    async && (err || loading || success) && css.input__state,
    css[kind ?? "primary"],
  ]);

  return (
    <label className={css.label}>
      <input
        placeholder="🔍"
        {...extraProps}
        ref={ref}
        type="text"
        className={finalClassInput}
      ></input>
      <State async={async} err={err} loading={loading} success={success} />
    </label>
  );
});

interface Props {
  async?: boolean;
  err?: string;
  loading?: boolean;
  success?: boolean;
  kind?: keyof typeof KINDS;
}
