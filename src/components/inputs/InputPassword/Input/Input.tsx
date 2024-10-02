import { forwardRef, useState } from "react";
import css from "./css.module.css";
import EyeIcon from "../EyeIcon/EyeIcon";
import { joinClass } from "../utils/joinClass";

interface Props {
  err?: string;
}

export default forwardRef(function Input(props: Props, ref: any) {
  const { err, ...extraProps } = props;
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const finalClassNameInput = joinClass([css.input, err && css.input__err]);

  const hVisiblePass = () => setIsVisiblePass(!isVisiblePass);
  return (
    <label className={css.label}>
      <input
        placeholder="Password"
        {...extraProps}
        ref={ref}
        type={!isVisiblePass ? "password" : "text"}
        className={finalClassNameInput}
      ></input>
      <EyeIcon isVisiblePass={isVisiblePass} hVisiblePass={hVisiblePass} />
    </label>
  );
});
