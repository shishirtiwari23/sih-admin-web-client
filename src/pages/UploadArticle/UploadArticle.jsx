import { useState, useContext } from "react";
import { Button, InputFieldText } from "../../components/";
import styles from "./UploadArticle.module.scss";
import { useSnackbar } from "notistack";
import { onValuesChange, convertToSlug } from "../../utils";
import { ArticleContext } from "../../utils";

const UploadArticle = () => {
  const { ARTICLE_API } = useContext(ArticleContext);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    title: "",
    content: "",
    categories: "123",
    thumbnail:
      "https://cdn.thinglink.me/api/image/347151190540156928/1024/10/scaletowidth/0/0/1/1/false/true?wait=true",
  });

  async function submitHandler(e) {
    e.preventDefault();
    const reqBody = {
      ...values,

      createdBy: {
        id: "123",
        userType: "Admin",
      },
      slug: convertToSlug(values?.title),
    };
    const res = await ARTICLE_API.post("/create", reqBody);
    console.log(res);
    if (res?.data?.status === "success")
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
