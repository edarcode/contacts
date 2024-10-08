import css from "./css.module.css";
import Paged from "../../components/paginations/Paged/Paged";
import { useAccountContacts } from "./useAccountContacts";
import InputText from "../../components/inputs/InputText/InputText";
import WrapperContacts from "./WrapperContacts/WrapperContacts";
import { useAccountContactsState } from "./useAccountContactsState";

export default function AccountContacts() {
  const {
    accountContacts,
    page,
    isLoading,
    isEmpty,
    setPage,
    name,
    setName,
    errName,
    refetchAccountContacts,
  } = useAccountContacts();

  const saveRefetchAccountContacts = useAccountContactsState(
    (state) => state.saveRefetchAccountContacts
  );

  if (saveRefetchAccountContacts)
    saveRefetchAccountContacts(refetchAccountContacts);

  return (
    <section className={css.contacts}>
      <div className={css.container}>
        <form className={css.form}>
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
        </form>

        <WrapperContacts
          accountContacts={accountContacts}
          errName={errName}
          isEmpty={isEmpty}
          isLoading={isLoading}
        />

        <Paged
          className={css.paged}
          page={page}
          totalPage={accountContacts?.totalPages || 1}
          action={setPage}
        />
      </div>
    </section>
  );
}
