const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJ0b29sdHQiOiJodHRwczovL3Rvb2x0dC5jb20ifV0sImlhdCI6MTY4MzE2MTQxNywiZXhwIjoxODQwOTgyMzk5LCJhdWQiOiIiLCJpc3MiOiIiLCJzdWIiOiIifQ.8e0z94lzOOmN_TYYwa9xD5IEHtZVKuRr0QBB25eQnY0'

// const datasetUrl = 'https://api.apify.com/v2/datasets/tjHpPvPYFdZ0fgKGE/items?clean=true&format=json'
const datasetUrl = 'https://api.apify.com/v2/datasets/zZGn4CynRTVvW0haV/items?clean=true&format=json'

async function embeddings() {
  const dataset = await (await fetch(datasetUrl)).json()
  // console.log(dataset, 'dataz')

  await fetch(' http://localhost:3000/api/embeddings', {
    method: 'POST',
    headers: { authorization: jwt, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({dataset})
  })
}


(async () => {
  await embeddings()
})()