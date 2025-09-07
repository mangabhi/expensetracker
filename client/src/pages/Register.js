import { Form, Input, message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      messageApi.success("Registration Successfull");
      setLoading(false);
    } catch (error) {
      messageApi.error("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("sheymoney-udemy-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      {contextHolder}
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Expense Tracker / Register</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered , Click Here To Login</Link>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
