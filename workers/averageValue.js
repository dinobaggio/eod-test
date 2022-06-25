// No 1 Thread-No
const { workerData, parentPort, threadId } = require('node:worker_threads')

console.log(`${__filename}: thread id ${threadId}`)

let data = []

if (workerData.isSequence) {
  data = workerData.data
  data = data.map(item => {
    const arrValue = [
      Number(item['Balanced']),
      Number(item['Previous Balanced'])
    ]
    return {
      ...item,
      ['No 1 Thread-No']: arrValue.reduce((a,b) => a+b)/arrValue.length
    }
  })
} else {
  workerData.data.forEach(item => {
    const arrValue = [
      Number(item['Balanced']),
      Number(item['Previous Balanced'])
    ]
    data.push({
      id: item.id,
      average: arrValue.reduce((a,b) => a+b)/arrValue.length
    })
  })
}

parentPort.postMessage(data)