import Board from "./board";

export default function ProjectDetails({ params }: { params: { id: string } }) {
  return (
    <main className="w-full h-full">
      <Board projectId={params.id} />
    </main>
  );
}
