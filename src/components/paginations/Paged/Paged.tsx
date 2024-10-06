import IconBtn from "./IconBtn/IconBtn";
import css from "./css.module.css";

export default function Paged({ action, totalPage, page }: Props) {
  const newPrevPage = page - 1;
  const isValidPrevPage = newPrevPage >= 1;

  const newNextPage = page + 1;
  const isValidNextPage = newNextPage <= totalPage;

  const prev = () => {
    if (!isValidPrevPage) return;
    action(newPrevPage);
  };

  const next = () => {
    if (!totalPage) return;
    if (!isValidNextPage) return;

    action(newNextPage);
  };

  return (
    <div className={css.paged}>
      <IconBtn
        className={css.back}
        onClick={prev}
        disabled={!isValidPrevPage}
      />
      <span className={css.page}>{page}</span>
      <IconBtn
        className={css.next}
        onClick={next}
        disabled={!isValidNextPage}
      />
    </div>
  );
}

type Props = {
  page: number;
  totalPage: number;
  action: (newPage: number) => void;
};
