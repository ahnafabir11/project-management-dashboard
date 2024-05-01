import ProjectCard from "@/components/ui/project-card";
import Search from "@/components/ui/search";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Home() {
  return (
    <main>
      <section className="bg-gray-50 mb-8">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Let&apos;s create a new project now! 🎉
              </p>
            </div>

            <Button
              size="large"
              type="primary"
              icon={<AppstoreAddOutlined />}
              className="w-full sm:w-auto mt-4 sm:mt-0"
            >
              Create Project
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="sm:flex sm:justify-end">
          <Search
            allowClear
            enterButton
            size="large"
            className="sm:max-w-xs"
            placeholder="Search project..."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 20 }).map((_, idx) => (
            <ProjectCard key={idx} id={idx.toString()} />
          ))}
        </div>
      </section>
    </main>
  );
}
