"use client";

export default function FormContainer({ title, children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 px-4 py-8">
      <div className="w-full max-w-5xl bg-gray-800/50 backdrop-blur-sm border border-teal-400/30 rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
            <span>COLOUR</span>
            <span className="text-teal-400 ml-2"></span>
          </div>
        </header>

        {/* Título */}
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <span className="bg-teal-400 w-2 h-8 md:h-10 mr-3 rounded hidden md:block"></span>
          {title}
        </h1>

        {/* Contenido */}
        {children}
      </div>
    </div>
  );
}
