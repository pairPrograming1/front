export default function BackButton() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="mt-6 text-left pl-8">
      <button onClick={handleGoBack} className="text-white-500 hover:underline">
        Volver atrás
      </button>
    </div>
  );
}
