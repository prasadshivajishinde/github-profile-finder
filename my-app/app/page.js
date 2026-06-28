import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          GitHub Profile Finder
        </h1>
        <p className="text-gray-500 text-sm">
          Search any GitHub user and explore their profile
        </p>
      </div>
      <SearchBar />
    </main>
  );
}