const { workerData, parentPort, threadId } = require('worker_threads')
const fs = require('fs')
const { parse } = require('csv-parse/sync');
console.log(`${__filename}: thread id ${threadId}`)
// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
const fileCsv = fs.readFileSync(workerData.path)

const data = parse(fileCsv, {
  delimiter: ';',
  columns: true
})

// for (let item of data) {
//   console.log(item)
// }

parentPort.postMessage(data)