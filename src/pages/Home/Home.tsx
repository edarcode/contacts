import { zodResolver } from "@hookform/resolvers/zod";
import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { CONTACTS, REGISTER } from "../../router/children";
import css from "./css.module.css";
import { loginSchema } from "./loginSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetch } from "../../hooks/useFetch";
import { LoginPayload, LoginRes, loginService } from "./loginService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { loading, err, res, startFetch } = useFetch<LoginPayload, LoginRes>(
    loginService
  );

  const navidate = useNavigate();

  useEffect(() => {
    if (!res) return;
    navidate(CONTACTS.to);
  }, [res, navidate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (credentials: LoginForm) => {
    startFetch(credentials);
  };

  return (
    <div className={css.home}>
      <form className={css.login} onSubmit={handleSubmit(onSubmit)}>
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
          ¿No tiene cuenta?<LinkTo to={REGISTER.to}>Registrarse</LinkTo>
        </span>
        <Btn
          disabled={!!Object.keys(errors).length || loading || !!res}
          loading={loading}
          err={!!err}
        >
          Iniciar sesión
        </Btn>
      </form>
    </div>
  );
}

type LoginForm = z.infer<typeof loginSchema>;
