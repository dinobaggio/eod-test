// No 2a Thread-No
const { workerData, parentPort, threadId } = require('node:worker_threads')
console.log(`${__filename}: thread id ${threadId}`)

let data = []

if (workerData.isSequence) {
  data = workerData.data
  data = data.map(item => {
    const balance = Number(item['Balanced'])
    if (balance >= 100 && balance <= 150) {
      return {
        ...item,
        ['No 2a Thread-No']: 5
      }
    }
    return item
  })
} else {
  workerData.data.forEach(item => {
    const balance = Number(item['Balanced'])
    let benefit = 0
    if (balance >= 100 && balance <= 150) {
      benefit = 5
    }
    data.push({
      id: item.id,
      benefit
    })
  }) 
}

parentPort.postMessage(data)