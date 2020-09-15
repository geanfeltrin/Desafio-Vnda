const process = require('process')
module.exports = {
  distDir: 'build',

  publicRuntimeConfig: {
    TOKEN: process.env.NEXT_PUBLIC_API_TOKEN
  }
}
