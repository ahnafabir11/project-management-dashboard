"use client";
import useProjectStore from "@/context/project-store";
import {
  MergeOutlined,
  ProjectOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useMemo } from "react";

interface LayoutProps extends PropsWithChildren {
  params: { id: string };
}

type MenuItem = Required<MenuProps>["items"][number];

// GET SELECTED ITEMS
const getSelectedItem = (pathname: string, items: string[]) => {
  const index = items.findIndex((item) => pathname.includes(item));
  return index === -1 ? "/" : items[index];
};

export default function Layout({ children, params }: LayoutProps) {
  const projects = useProjectStore((state) => state.projects);
  const project = useMemo(() => {
    return projects.find((project) => project.id === params.id)!;
  }, [projects, params.id]);

  const pathname = usePathname();
  const BASE_URL = `/projects/${params.id}`;

  const items: MenuItem[] = [
    {
      key: "/",
      icon: <ProjectOutlined />,
      label: <Link href={`${BASE_URL}`}>Baord</Link>,
    },
    {
      key: "/members",
      icon: <TeamOutlined />,
      label: <Link href={`${BASE_URL}/members`}>Members</Link>,
    },
    {
      key: "/timeline",
      icon: <MergeOutlined />,
      label: <Link href={`${BASE_URL}/timeline`}>Timeline</Link>,
    },
  ];

  const defaultActiveItemkey = getSelectedItem(
    pathname,
    items.map((item) => item?.key as string).filter((item) => item !== "/")
  );

  return (
    <div className="h-full flex flex-col">
      <Breadcrumb
        items={[
          { title: <Link href="/">Projects</Link> },
          { title: project.name },
        ]}
      />

      <div className="grow overflow-hidden flex flex-col lg:flex-row mt-8">
        <div className="shrink-0 block lg:hidden">
          <Menu
            mode="horizontal"
            items={items}
            defaultSelectedKeys={[defaultActiveItemkey]}
          />
        </div>

        <div className="shrink-0 hidden lg:block w-full max-w-[15rem]">
          <Menu
            mode="inline"
            items={items}
            className="h-full"
            defaultSelectedKeys={[defaultActiveItemkey]}
          />
        </div>

        <div className="grow overflow-auto">{children}</div>
      </div>
    </div>
  );
}
