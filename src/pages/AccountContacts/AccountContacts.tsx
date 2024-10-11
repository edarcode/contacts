import css from "./css.module.css";
import Paged from "../../components/paginations/Paged/Paged";
import { useAccountContacts } from "./useAccountContacts";
import InputText from "../../components/inputs/InputText/InputText";
import WrapperContacts from "./WrapperContacts/WrapperContacts";
import { useAccountContactsState } from "./useAccountContactsState";
import { Add } from "../../components/icons/Add";
import { useState } from "react";
import AddContact from "./AddContact/AddContact";

export default function AccountContacts() {
  const [isAdding, setIsAdding] = useState(false);
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

  saveRefetchAccountContacts(refetchAccountContacts);

  return (
    <section className={css.contacts}>
      <div className={css.container}>
        <form className={css.form}>
          <InputText
            value={name}
            onChange={(e) => setName(String(e.target.value))}
          />
        </form>

        <WrapperContacts
          accountContacts={accountContacts}
          errName={errName}
          isEmpty={isEmpty}
          isLoading={isLoading}
        />

        <div className={css.containerPagedAndAdd}>
          <Add className={css.add} onClick={() => setIsAdding(true)} />
          <Paged
            className={css.paged}
            page={page}
            totalPage={accountContacts?.totalPages || 1}
            action={setPage}
          />
        </div>

        {isAdding && <AddContact closeForm={() => setIsAdding(false)} />}
      </div>
    </section>
  );
}
