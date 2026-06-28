export default function RepoCard({ repo }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline text-sm"
        >
          {repo.name}
        </a>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {repo.visibility}
        </span>
      </div>

      {repo.description && (
        <p className="text-gray-500 text-xs">{repo.description}</p>
      )}

      <div className="flex gap-4 mt-1">
        {repo.language && (
          <span className="text-xs text-gray-600">🟡 {repo.language}</span>
        )}
        <span className="text-xs text-gray-600">⭐ {repo.stargazers_count}</span>
        <span className="text-xs text-gray-600">🍴 {repo.forks_count}</span>
      </div>
    </div>
  );
}