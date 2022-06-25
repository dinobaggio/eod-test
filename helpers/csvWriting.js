const csvsync = require('csvsync');
const fs = require('fs');

module.exports = function (dataSrc, output = './source/output.csv') {
  const columns = Object.keys(dataSrc[0])
  const data = [
    columns,
  ];
  dataSrc.forEach(item => {
    const result = []
    columns.forEach(column => result.push(item[column]))
    data.push(result)
  })
  const csv = csvsync.stringify(data, { delimiter: ';' })
  fs.writeFileSync(output, csv)
}