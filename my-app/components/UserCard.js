import Image from "next/image";

export default function UserCard({ user }) {
 
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-md">
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={100}
        height={100}
        className="rounded-full"
      />

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {user.name || user.login}
        </h2>

        <p className="text-gray-500 text-sm">@{user.login}</p>

        {user.bio && (
          <p className="text-gray-600 mt-2 text-sm">
            {user.bio}
          </p>
        )}

        {user.location && (
          <p className="text-gray-400 text-sm mt-1">
            📍 {user.location}
          </p>
        )}
      </div>

      <div className="flex gap-6 mt-2">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">
            {user.followers}
          </p>
          <p className="text-gray-500 text-xs">Followers</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">
            {user.following}
          </p>
          <p className="text-gray-500 text-xs">Following</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">
            {user.public_repos}
          </p>
          <p className="text-gray-500 text-xs">Repos</p>
        </div>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition text-sm"
      >
        View on GitHub
      </a>
    </div>
  );
}