export const uploadImg = async (imgs: FileList) => {
  const presetName = import.meta.env.VITE_PRESET_NAME;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", imgs[0]);
  formData.append("upload_preset", presetName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const res = await response.json();
  return res.secure_url;
};
