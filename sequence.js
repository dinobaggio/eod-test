const _ = require('lodash')
const { isMainThread } = require("node:worker_threads")
const {
  parsingCsv,
  writingCsv,
  averageValue,
  benefitA,
  benefitB,
  additionalBalance
} = require('./workers')

let saldo = 1000

async function main() {
  let beforeEod = []
  let afterEod = []
  await Promise.all([
    parsingCsv({ path: './source/Before Eod.csv' }),
    parsingCsv({ path: './source/After Eod.csv' })
  ]).then(([before, after]) => {
    beforeEod = before
    afterEod = after
  })
  afterEod = await averageValue({ data: afterEod, isSequence: true })
  afterEod = await benefitA({ data: afterEod, isSequence: true })
  afterEod = await benefitB({ data: afterEod, isSequence: true })
  // use updated saldo in above
  const arr100 = afterEod.slice(0,100)
  const chunks = _.chunk(arr100, Math.ceil(100/8)) // 8 threads
  const afterAdd = []
  for (let i = 0; i < chunks.length; i++) {
    const arrData = chunks[i];
    const { updatedSaldo, data } = await additionalBalance({ data: arrData, saldo, isSequence: true })
    saldo = updatedSaldo
    data.forEach(item => afterAdd.push(item))
  }
  afterEod = afterEod.map(item => {
    const find = afterAdd.find(data => data.id === item.id)
    if (find) {
      return find
    }
    return item
  })
  writingCsv({
    data: afterEod,
    output: './source/sequence_results.csv'
  })
}

setImmediate(main)