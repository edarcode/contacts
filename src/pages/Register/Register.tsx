import { useForm } from "react-hook-form";
import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { CONTACTS, LOGIN } from "../../router/children";
import css from "./css.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { useFetch } from "../../hooks/useFetch";
import {
  RegisterPayload,
  RegisterRes,
  registerService,
} from "./registerService";
import { z } from "zod";
import Ad from "../../components/modals/Ad/Ad";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { loading, err, res, startFetch } = useFetch<
    RegisterPayload,
    RegisterRes
  >(registerService);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (credentials: RegisterForm) => {
    startFetch(credentials);
  };

  const navigate = useNavigate();

  return (
    <div className={css.register}>
      <h1>Registrarse</h1>
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
          ¿Ya tiene cuenta?<LinkTo to={LOGIN.to}>Iniciar sesión</LinkTo>
        </span>
        <Btn
          disabled={!!Object.keys(errors).length || loading || !!res}
          loading={loading}
          err={!!err}
        >
          Registrarse
        </Btn>
        <Ad
          isVisible={!!res}
          message="Hemos enviado un correo para cofirmar su registro."
          action={() => navigate(CONTACTS.to)}
        />
      </form>
    </div>
  );
}

type RegisterForm = z.infer<typeof registerSchema>;
