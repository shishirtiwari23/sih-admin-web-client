import styles from "./Login.module.scss";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { AuthContext, onValuesChange } from "../../utils";
import { Button, InputFieldText } from "../../components";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { id, value, name } = e.target;
    // console.log(id, value, name);
    setValues((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  useEffect(() => {
    console.log(values);
  });

  const { setCurrentUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/auth/login/`,
        {
          email: values?.email,
          password: values?.password,
        }
      );

      console.log({ decoded: decodeToken(response.data.token), response });

      if (response.status === 200) {
        let decoded = decodeToken(response.data.token);
        setCurrentUser({
          id: decoded.id,
          email: decoded.email,
        });
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        navigate("/");
      } else {
      }
    } catch (error) {
      // console.log("True error", error.response);
      setError(error.response.data.message);
      setLoading(false);
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} action="">
        <InputFieldText
          required
          id="email"
          type="email"
          value={values?.email}
          onChange={(e) => onValuesChange(e, setValues)}
          label="Email"
        />
        <InputFieldText
          required
          id="password"
          type="password"
          value={values?.password}
          onChange={(e) => onValuesChange(e, setValues)}
          label="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
