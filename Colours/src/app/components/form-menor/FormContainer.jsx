"use client";

export default function FormContainer({ title, children }) {
  return (
    <div className="min-h-screen relative overflow-hidden mt-4 sm:mt-8 md:mt-16">
      <header className="flex justify-between items-center p-4 md:p-8 lg:p-10 bg-black/30 backdrop-blur-sm">
        <h1 className="text-white text-2xl md:text-3xl font-bold">
          Bienvenido a <span className="text-teal-400"></span>
        </h1>
      </header>

      <div className="w-full px-4 sm:px-6 md:px-0 pt-6 pb-20 mt-20 sm:mt-8 md:mt-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-none md:rounded-2xl p-6 md:p-10 max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto border-t border-b border-teal-400/30 md:border">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 flex items-center">
            <span className="bg-teal-400 w-2 h-8 md:h-10 mr-3 rounded hidden md:block"></span>
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
