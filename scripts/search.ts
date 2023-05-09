

async function search() {
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJ0b29sdHQiOiJodHRwczovL3Rvb2x0dC5jb20ifV0sImlhdCI6MTY4MzE2MTQxNywiZXhwIjoxODQwOTgyMzk5LCJhdWQiOiIiLCJpc3MiOiIiLCJzdWIiOiIifQ.8e0z94lzOOmN_TYYwa9xD5IEHtZVKuRr0QBB25eQnY0'

  await fetch(' http://localhost:3000/api/search?text=startup&text=ai', {
    method: 'GET',
    headers: { authorization: jwt, 'Content-Type': 'application/json', accept: 'application/json' },
  })
}


(async () => {
  await search()
})()