type Class = string | undefined | null | false;
type ClassNames = Class[];

export const joinClass = (classNames: ClassNames) => {
  const validClasses = classNames.filter(Boolean);
  const finalClass = validClasses.join(" ");
  return finalClass;
};
