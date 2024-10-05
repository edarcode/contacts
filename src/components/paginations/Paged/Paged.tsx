import { useState } from "react";
import IconBtn from "./IconBtn/IconBtn";
import css from "./css.module.css";

export default function Paged({ fn, totalPage }: Props) {
  const [page, setPage] = useState(1);

  const back = () => {
    const isValidPage = page - 1 >= 1;
    if (!isValidPage) return;

    const newPage = page - 1;
    fn(newPage);
    setPage(newPage);
  };

  const next = () => {
    if (!totalPage) return;
    const isValidPage = page + 1 <= totalPage;
    if (!isValidPage) return;

    const newPage = page + 1;
    fn(newPage);
    setPage(newPage);
  };

  return (
    <div className={css.paged}>
      <IconBtn className={css.back} onClick={back} />
      <span className={css.page}>{page}</span>
      <IconBtn className={css.next} onClick={next} />
    </div>
  );
}

type Props = {
  fn: (newPage: number) => void;
  totalPage?: number;
};
