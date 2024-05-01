"use client";
import { useRouter } from "next/navigation";
import Search from "./ui/search";

export default function ProjectSearchFilter() {
  const router = useRouter();

  return (
    <Search
      allowClear
      enterButton
      size="large"
      className="sm:max-w-xs"
      placeholder="Search project..."
      onChange={(e) => router.push(`?search=${e.target.value}`)}
    />
  );
}
