import { parse } from 'csv'
import fs from 'node:fs'

const csvPath = new URL('tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParser = parse({
  fromLine: 2,
  delimiter: ',',
  skipEmptyLines: true,
})

async function execute() {
  const parsedRow = stream.pipe(csvParser)

  for await (const row of parsedRow) {
    const [title, description] = row

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
  }
}

execute()
