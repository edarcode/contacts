import { useForm } from "react-hook-form";
import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { HOME } from "../../router/children";
import css from "./css.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { useFetch } from "../../hooks/useFetch";
import {
  RegisterPayload,
  RegisterRes,
  registerService,
} from "./registerService";

export default function Register() {
  const { loading, err, startFetch } = useFetch<RegisterPayload, RegisterRes>(
    registerService
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (credentials: any) => {
    startFetch(credentials);
  };

  return (
    <div className={css.register}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <InputText
          placeholder="ejemplo@gmail.com"
          {...register("email")}
          err={errors?.email?.message as string}
        />
        <InputPassword
          placeholder="contraseña"
          {...register("password")}
          err={errors?.password?.message as string}
        />
        <span className={css.wrapper_register}>
          ¿Ya tiene cuenta?<LinkTo to={HOME.to}>Iniciar sesión</LinkTo>
        </span>
        <Btn
          disabled={!!Object.keys(errors).length || loading}
          loading={loading}
          err={!!err}
        >
          Registrarse
        </Btn>
      </form>
    </div>
  );
}
