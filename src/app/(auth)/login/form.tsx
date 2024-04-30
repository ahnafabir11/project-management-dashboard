"use client";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notification } from "antd";

type FieldType = {
  email?: string;
  password?: string;
};

export default function From() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const DB_EMAIL = "test@mail.com";
    const DB_PASSWORD = "123456";

    setLoading(true);

    try {
      // 02 SECOND DELAY
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // CHECKINGN IF EMAIL AND PASSWORD MATCHES
      await new Promise((resolve, reject) => {
        if (DB_EMAIL === values.email && DB_PASSWORD === values.password) {
          resolve("Logged In Successfully");
        } else {
          reject(Error("Invalid Credencials"));
        }
      });

      // REDIRECT TO HOME AFTER SUCCESSFUL LOGIN
      notification.success({
        message: "Logged In Successfully",
        description: "You are being redirected to home page",
      });

      router.push("/");
    } catch (e: any) {
      // SHOW ERROR NOTIFICATION
      notification.error({
        message: e.message,
        description:
          "Use test@mail.com as email and 123456 as password for testing purpose.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        colon={false}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="space-y-8"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        initialValues={{ email: "test@mail.com", password: "123456" }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={loading}
        >
          Login
        </Button>
      </Form>
    </>
  );
}
