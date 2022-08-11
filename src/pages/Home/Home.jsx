import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import styles from "./Home.module.scss";
import { ArticleContext } from "../../utils";

const Home = () => {
  const [data, setData] = useState([]);

  const { ARTICLE_API } = useContext(ArticleContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ARTICLE_API.get("/all");
      setData(result.data);
    };
    fetchData();
  }, [ARTICLE_API]);

  return (
    <section className={styles.container}>
      {data?.map((item, i) => (
        <div key={item.title + i}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <hr />
          <br />
          <br />
        </div>
      ))}
    </section>
  );
};

export default Home;
