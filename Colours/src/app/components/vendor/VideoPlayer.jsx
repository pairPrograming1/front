export default function VideoPlayer() {
  return (
    <div className="w-full relative rounded-lg overflow-hidden lg:w-3/4 lg:mx-auto">
      <img
        src="/placeholder.svg?height=200&width=400"
        alt="Event preview"
        className="w-full h-auto lg:h-64"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center lg:w-16 lg:h-16">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-white ml-1 lg:border-t-10 lg:border-b-10 lg:border-l-16"></div>
          </div>
          <span className="ml-2 text-xl font-bold lg:text-2xl">COLOUR</span>
        </div>
      </div>
    </div>
  );
}
