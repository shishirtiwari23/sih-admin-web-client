import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import styles from "./Add.module.scss";
import { useSnackbar } from "notistack";

export const LIVE_API = axios.create({
  baseURL: process.env.REACT_APP_API_URI + "/live",
});

const Add = () => {
  const [values, setValues] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  function handleChange(key) {
    return (e) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }
  function pushSnackbar(msg, variant, time) {
    if (variant) {
      enqueueSnackbar(msg, { variant });
      setTimeout(() => {
        closeSnackbar();
      }, time);
    } else {
      enqueueSnackbar(msg);
      setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    try {
      const res = await LIVE_API.post("/create", values);
      pushSnackbar("This Post is Currently Live", "success");
    } catch (error) {
      pushSnackbar("Unable to go live", "error");
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={values?.title}
          onChange={handleChange("title")}
        />
        <TextField
          label="Link"
          margin="normal"
          value={values?.videoUrl}
          onChange={handleChange("videoUrl")}
        />

        <Button variant="contained" type="submit">
          Go Live
        </Button>
      </form>
    </div>
  );
};

export default Add;
