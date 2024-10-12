export const deleteImg = async (imageUrl: string) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  // Extraer el public_id de la URL
  const splitImg = imageUrl.split("/");
  const publicId = "contacts/" + splitImg[splitImg.length - 1].split(".")[0];

  const timestamp = Math.floor(Date.now() / 1000);

  // Crear la cadena de firma
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = await crypto.subtle
    .digest("SHA-1", new TextEncoder().encode(stringToSign))
    .then((digest) =>
      Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
    );

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const res = await response.json();
  console.log(res);
  return res;
};
