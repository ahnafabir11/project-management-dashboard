import CreateProjectTrigger from "@/components/create-project-trigger";
import ProjectSearchFilter from "@/components/project-search-filter";
import ProjectList from "./project-list";

export default function Home({
  searchParams,
}: {
  searchParams: { search: string | undefined };
}) {
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

            <CreateProjectTrigger />
          </div>
        </div>
      </section>

      <section>
        <div className="sm:flex sm:justify-end">
          <ProjectSearchFilter />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
          <ProjectList searchString={searchParams.search} />
        </div>
      </section>
    </main>
  );
}
