import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export const NOTIFICATION_API = axios.create({
  // baseURL: process.env.REACT_APP_API_URI + "/notification",
  baseURL: "http://localhost:5000/notification",
});

const Notification = () => {
  const [values, setValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  function handleChange(param) {
    return (e) => {
      setValues((prev) => ({ ...prev, [param]: e.target.value }));
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
    try {
      const res = await NOTIFICATION_API.post("/publish", {
        ...values,
      });
      console.log(res);
      pushSnackbar("Notification Published Successfully", "success");
    } catch (error) {
      pushSnackbar("Failed to Publish Notification", "error");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ margin: "0.5rem 0" }}
          label="Title"
          required
          value={values?.title}
          onChange={handleChange("title")}
        />
        <TextField
          sx={{ margin: "0.5rem 0" }}
          label="Description"
          required
          value={values?.body}
          onChange={handleChange("body")}
        />
        <TextField
          sx={{ margin: "0.5rem 0" }}
          label="Image (Optional)"
          value={values?.image}
          onChange={handleChange("image")}
        />
        <Button variant="contained" type="submit">
          Brodcast
        </Button>
      </form>
    </div>
  );
};

export default Notification;
