export default function UserCard({ name }) {
  return (
    <div className="bg-teal-400 rounded-lg p-4 mb-4 flex justify-between items-center">
      <span className="text-lg">{name}</span>
      <button className="text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
        </svg>
      </button>
    </div>
  );
}
