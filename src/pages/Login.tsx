import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../storeHooks";
import { loginUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Button, Card, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Form data type
type FormData = {
  email: string;
  password: string;
};

// ✅ Validation schema
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  })
  .required();

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();

  // ✅ react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // ✅ Submit handler
  const onSubmit = async (data: FormData) => {
    const res = await dispatch(loginUser(data));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/users");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Card title="Sign in" style={{ width: 360 }}>
        {auth.error && (
          <Alert
            message={auth.error}
            type="error"
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}

        {/* ✅ Important: use onSubmitCapture */}
        <Form layout="vertical" onSubmitCapture={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter email" {...field} />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password placeholder="Enter password" {...field} />
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={auth.loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
