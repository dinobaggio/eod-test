const { Worker, isMainThread } = require("node:worker_threads")

function workerCreate (workerData, path) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, { workerData })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

exports.parsingCsv = (workerData) => workerCreate(workerData, './workers/parsingCsv.js')
exports.writingCsv = (workerData) => workerCreate(workerData, './workers/writingCsv.js')
exports.averageValue = (workerData) => workerCreate(workerData, './workers/averageValue.js')
exports.benefitA = (workerData) => workerCreate(workerData, './workers/benefitA.js')
exports.benefitB = (workerData) => workerCreate(workerData, './workers/benefitB.js')
exports.additionalBalance = (workerData) => workerCreate(workerData, './workers/additionalBalance.js')
