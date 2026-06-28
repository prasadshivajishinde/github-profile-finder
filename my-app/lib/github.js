
export async function getUser(username)
{
   const res = await fetch(`https://api.github.com/users/${username}`,{
   headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
    next: { revalidate: 60 },
  
   })
   
   if(!res.ok)
   {
    throw new Error ("User not found")
   }

   return res.json()
  }


  
export async function getUserRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Repos not found");
  }

  return res.json();
}