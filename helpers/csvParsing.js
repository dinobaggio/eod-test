const fs = require('fs')
const { parse } = require('csv-parse/sync');

module.exports = function (path) {
  const fileCsv = fs.readFileSync(path)
  const data = parse(fileCsv, {
    delimiter: ';',
    columns: true
  })

  return data
}