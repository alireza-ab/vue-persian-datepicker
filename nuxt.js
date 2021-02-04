import { join, resolve } from 'path'

export default function (option) {
  if (option['PersianDate'])
    this.addPlugin({
      src: resolve(__dirname, 'node_modules/@alireza-ab/persian-date/lib/plugin.js'),
      fileName: 'PersianDate.js'
    })
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: join(__dirname, 'src/components'),
    })
  })
}

module.exports.meta = require('./package.json')
