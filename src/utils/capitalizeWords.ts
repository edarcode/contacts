export const capitalizeWords = (text: string) => {
  return text
    .split(" ") // Divide el texto en palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(" "); // Une las palabras en una sola cadena
};
