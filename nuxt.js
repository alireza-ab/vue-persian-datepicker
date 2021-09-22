import { join } from 'path';

export default function (option) {
  if (option['PersianDate']) {
    this.addModule('@alireza-ab/persian-date/lib/nuxt');
  }
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: join(__dirname, 'src/components'),
    });
  });
}

module.exports.meta = require('./package.json');
