import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../../../utils";
import styles from "./Article.module.scss";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Article = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const { ARTICLE_API } = useContext(ArticleContext);
  const [article, setArticle] = useState({});
  async function getArticle() {
    const res = await ARTICLE_API.get("/single", {
      params: {
        id,
      },
    });
    if (res.status === 200) {
      const newArticle = res.data;
      console.log(newArticle);
      setArticle(newArticle);
    } else {
      enqueueSnackbar("Failed To Load Article", { variant: "error" });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getArticle();
  }, []);
  if (isLoading) {
    <CircularProgress />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{article?.title}</h2>
        <div className={styles.moreInfo}>
          <div className={styles.icon}>
            <AiOutlineLike /> <span> {article?.likes?.length ?? "NA"}</span>
          </div>
          <div className={styles.icon}>
            <AiOutlineEye /> <span> {article?.views ?? "NA"}</span>
          </div>
          <div className={styles.icon}>
            <BsBookmarkCheck /> <span> {article?.savedByCount ?? "NA"}</span>
          </div>
          <div className={styles.icon}>
            <AiOutlineShareAlt /> <span> {article?.shares ?? "NA"}</span>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <p>{article?.content}</p>
        <img src={article?.thumbnail} alt={article?.title} />
      </div>
      <div className={styles.footer}>
        <p>
          Created By:
          <span>{article?.createdBy?.id ?? "NA"}</span>
        </p>
        <p>
          Created At:<span>{article?.createdAt ?? "NA"}</span>
        </p>
        <p>
          Updated At:<span>{article?.updatedAt ?? "NA"}</span>
        </p>
      </div>
    </div>
  );
};

export default Article;
