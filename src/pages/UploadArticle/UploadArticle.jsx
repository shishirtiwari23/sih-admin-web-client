import { useState } from "react";
import { Button, InputFieldText } from "../../components/";
import styles from "./UploadArticle.module.scss";
import { useSnackbar } from "notistack";
import { onValuesChange, convertToSlug } from "../../utils";

const UploadArticle = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  async function submitHandler(e) {
    e.preventDefault();
    const reqBody = { ...values, slug: convertToSlug(values?.title) };
    const res = { status: 1 }; // Axios Call
    if (res?.status === 1)
      enqueueSnackbar("Article Published", { variant: "success" });
    else enqueueSnackbar("Failed To Publish Article", { variant: "error" });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} action="">
        <InputFieldText
          required
          id="title"
          value={values?.title}
          onChange={(e) => onValuesChange(e, setValues)}
          variant="small"
          label="Title"
        />
        <InputFieldText
          required
          id="content"
          value={values?.content}
          onChange={(e) => onValuesChange(e, setValues)}
          variant="large"
          label="Content"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default UploadArticle;
