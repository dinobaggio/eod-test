const { workerData, parentPort, threadId } = require('node:worker_threads')
const csvWriting = require('../helpers/csvWriting');
console.log(`${__filename}: thread id ${threadId}`)

csvWriting(workerData.data, workerData.output)

parentPort.postMessage({ message: 'success' })