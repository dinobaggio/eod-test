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
  const arr100 = beforeEod.slice(0,100)
  const chunks = _.chunk(arr100, Math.ceil(100/8)) // 8 threads
  
  const results = await Promise.all([
    averageValue({ data: beforeEod }),
    benefitA({ data: beforeEod }),
    benefitB({ data: beforeEod }),
    ...chunks.map((arr) =>{
      return additionalBalance({ data: arr })
    })
  ])
  const [resultAverage, resultBenefitA, resultBenefitB] = results.splice(0, 3)
  const addBenefit = []
  results.forEach(({ data: getData }) => {
    getData.forEach(result => addBenefit.push(result))
  })
  afterEod = afterEod.map(data => {
    const average = resultAverage.find(item => item.id === data.id)
    const resBenefitA = resultBenefitA.find(item => item.id === data.id)
    const resBenefitB = resultBenefitB.find(item => item.id === data.id)
    const resAddBenefit = addBenefit.find(item => item.id === data.id)
    return {
      ...data,
      ['No 1 Thread-No']: average?.average,
      ['No 2a Thread-No']: resBenefitA?.benefit,
      ['No 2b Thread-No']: resBenefitB?.benefit,
      ['No 3 Thread-No']: resAddBenefit?.balanced,
    }
  })
  writingCsv({
    data: afterEod,
    output: './source/results.csv'
  })
}

setImmediate(main)