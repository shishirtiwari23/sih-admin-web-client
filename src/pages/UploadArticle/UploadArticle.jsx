import { useState, useContext } from "react";
import styles from "./UploadArticle.module.scss";
import { useSnackbar } from "notistack";
import { onValuesChange, convertToSlug } from "../../utils";
import { ArticleContext } from "../../utils";
import { TextField, Button } from "@mui/material";
import { CreatableMultipleSelect } from "../../components";

const UploadArticle = () => {
  const { ARTICLE_API } = useContext(ArticleContext);
  const [categoryOptions, setCategoryOptions] = useState([
    {
      name: "Vlog",
      value: "vlog",
    },
    {
      name: "Makeup",
      value: "makeup",
    },
    {
      name: "Genz",
      value: "genz",
    },
    {
      name: "Skincare",
      value: "skincare",
    },
    {
      name: "Fitness",
      value: "fitness",
    },
    {
      name: "Couple",
      value: "couple",
    },
    {
      name: "Dance",
      value: "dance",
    },
    {
      name: "Comedy",
      value: "comedy",
    },
    {
      name: "Music",
      value: "music",
    },
  ]);
  const [category, setCategory] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    title: "",
    content: "",
    categories: "123",
    thumbnail:
      "https://cdn.thinglink.me/api/image/347151190540156928/1024/10/scaletowidth/0/0/1/1/false/true?wait=true",
  });

  async function handleAddCategory(newCategory) {
    console.log(newCategory);
  }

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
        <TextField
          required
          id="title"
          value={values?.title}
          onChange={(e) => onValuesChange(e, setValues)}
          label="Title"
          variant="outlined"
        />
        <CreatableMultipleSelect
          required
          options={categoryOptions}
          width="100%"
          setValue={setCategory}
          id="brandSector"
          value={category}
          label={"Category"}
          onAddModalSubmit={handleAddCategory}
        />
        <TextField
          required
          multiline
          maxRows={16}
          minRows={4}
          id="content"
          value={values?.content}
          onChange={(e) => onValuesChange(e, setValues)}
          label="Content"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UploadArticle;
