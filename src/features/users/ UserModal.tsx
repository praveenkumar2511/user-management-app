import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import type { User } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  visible: boolean;
  initial?: User | null;
  onCancel: () => void;
  onSubmit: (data: Partial<User>) => void;
};

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

const schema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    avatar: yup
      .string()
      .url("Invalid avatar")
      .required("Image Link is required"),
  })
  .required();

const UserModal: React.FC<Props> = ({
  visible,
  initial,
  onCancel,
  onSubmit,
}) => {
  console.log(initial, "initial");

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      first_name: initial?.first_name ?? "",
      last_name: initial?.last_name ?? "",
      email: initial?.email ?? "",
      avatar: initial?.avatar ?? "",
    });
  }, [initial, reset]);

  const handleOk = handleSubmit((values) => {
    onSubmit({
      ...initial,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      avatar: values.avatar,
    });
  });

  return (
    <Modal
      open={visible}
      title={initial ? "Edit user" : "Create user"}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose={false}
    >
      <Form layout="vertical">
        <Form.Item
          label={
            <span>
              <span style={{ color: "red" }}>*</span> First Name
            </span>
          }
          validateStatus={formState.errors.first_name ? "error" : ""}
          help={formState.errors.first_name?.message}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label={
            <span>
              <span style={{ color: "red" }}>*</span> Last Name
            </span>
          }
          validateStatus={formState.errors.last_name ? "error" : ""}
          help={formState.errors.last_name?.message}
        >
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label={
            <span>
              <span style={{ color: "red" }}>*</span> Email
            </span>
          }
          validateStatus={formState.errors.email ? "error" : ""}
          help={formState.errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label={
            <span>
              <span style={{ color: "red" }}>*</span> Profile Image Link
            </span>
          }
          validateStatus={formState.errors.avatar ? "error" : ""}
          help={formState.errors.avatar?.message}
        >
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
