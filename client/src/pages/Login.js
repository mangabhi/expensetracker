import { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../resources/authentication.css";
import axios from "axios";
import "antd/dist/reset.css"; // Ensure this is included

function Login() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "sheymoney-udemy-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Login Successful",
      });
      form.resetFields();
      navigate("/");
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
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
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Expense Tracker / Login</h1>
            <hr />
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Registered Yet, Click Here To Register
              </Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
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
      </div>
    </div>
  );
}

export default Login;
