export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div
          className="h-[50vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
              Passionate about the outdoors since 2005
            </p>
          </div>
        </div>
      </div>
      {/* Misson Section */}
    </div>
  );
}
