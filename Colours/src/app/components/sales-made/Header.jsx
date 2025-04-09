export default function Header({ title }) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
}
