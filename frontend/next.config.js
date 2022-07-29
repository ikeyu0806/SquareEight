/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@babel/preset-react'
])

module.exports = withTM({
  reactStrictMode: true,
  env: {
    ...require(`./config/${process.env.APP_ENV || 'local'}.json`),
  },
})
