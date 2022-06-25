// No 3 Thread-No
const _ = require('lodash')
const { workerData, parentPort, threadId } = require('node:worker_threads')
console.log(`${__filename}: thread id ${threadId}`)

let data = []
let updatedSaldo = null

if (workerData.isSequence) {
  let saldo = workerData.saldo
  data = workerData.data

  data = data.map(item => {
    const balanced = Number(item['Balanced'])
    if (saldo >= 10) {
      saldo -= 10
      return {
        ...item,
        ['No 3 Thread-No']: balanced + 10
      }
    }
    return item
  })
  updatedSaldo = saldo
} else {
  for (let i = 0; i < workerData.data.length; i++) {
    const item = workerData.data[i];
    const balanced = Number(item['Balanced'])
    data.push({
      id: item.id,
      balanced: balanced + 10
    })
  }
}

parentPort.postMessage({ updatedSaldo, data })