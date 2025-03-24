export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 w-full max-w-xl">
      <h1 className="text-xl font-bold">Colour</h1>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        ></svg>
      </button>
    </header>
  );
}
