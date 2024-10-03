import { ACCOUNT, LOGIN } from "../../router/children";
import { useAuth } from "../useAuth";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { DefaultImg } from "./DefaultImg";

export default function LinkToAccount() {
  const getTokenPayload = useAuth((auth) => auth.getTokenPayload);
  const token = useAuth((auth) => auth.token);
  const tokenPayload = getTokenPayload();

  if (!token) return <LinkTo to={LOGIN.to}>{LOGIN.display}</LinkTo>;

  if (tokenPayload && tokenPayload.img)
    return (
      <LinkTo to={ACCOUNT.to}>
        <img
          src={tokenPayload.img}
          width="40px"
          height="40px"
          style={{ borderRadius: "50%" }}
          alt="Img usuario"
        />
      </LinkTo>
    );

  return (
    <LinkTo to={ACCOUNT.to}>
      <DefaultImg />
    </LinkTo>
  );
}
