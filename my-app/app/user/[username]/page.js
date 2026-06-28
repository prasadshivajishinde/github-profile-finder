import { getUser, getUserRepos } from "@/lib/github";
import UserCard from "@/components/UserCard";
import RepoCard from "@/components/RepoCard";
import SearchBar from "@/components/SearchBar";

export default async function UserPage({ params }) {
  const { username } = await params;

  try {
    const user = await getUser(username);
    const repos = await getUserRepos(username);

    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 p-6">
        <SearchBar />
        <UserCard user={user} />
        <div className="w-full max-w-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Top Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-2xl font-bold text-red-500">User not found!</h2>
        <SearchBar />
      </main>
    );
  }
}