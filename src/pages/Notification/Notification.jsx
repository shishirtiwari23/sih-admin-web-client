import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Notification = () => {
  const [values, setValues] = useState({});
  function handleChange(param) {
    return (e) => {
      setValues((prev) => ({ ...prev, [param]: e.target.value }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Message"
          value={values?.message}
          onChange={handleChange("message")}
        />
        {/* <TextField value={values?.message} onChange={handleChange("message")} /> */}
        <TextField
          label="Icon"
          value={values?.icon}
          margin="normal"
          onChange={handleChange("icon")}
        />
        <TextField
          label="Big Icon"
          value={values?.bigIcon}
          onChange={handleChange("bigIcon")}
        />
        <Button variant="contained" type="submit">
          Push
        </Button>
      </form>
    </div>
  );
};

export default Notification;
