"use client";

import { Input } from "antd";
import type { GetProps } from "antd";

type SearchPropsType = GetProps<typeof Input.Search>;

export default function Search(props: SearchPropsType) {
  return <Input.Search {...props} />;
}
