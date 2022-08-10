export function onValuesChange(e, setValues, type) {
  if (type === "file") {
    const { id, files } = e.target;
    setValues((prev) => {
      return { ...prev, [id]: URL.createObjectURL(files[0]) };
    });
  }
  const { id, value, name } = e.target;
  // console.log(id, value, name);
  setValues((prev) => {
    return {
      ...prev,
      [name ? name : id]: value,
    };
  });
}

export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
