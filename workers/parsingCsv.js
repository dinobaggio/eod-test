const { workerData, parentPort, threadId } = require('worker_threads')
const fs = require('fs')
const { parse } = require('csv-parse/sync');
console.log(`${__filename}: thread id ${threadId}`)

const fileCsv = fs.readFileSync(workerData.path)

const data = parse(fileCsv, {
  delimiter: ';',
  columns: true
})

parentPort.postMessage(data)