const fs = require('fs')
const path = require('path')

/**
 * Handy helpers, plucked from create-react-app
 */
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const safeGetFile = (filename) => {
  if (fs.existsSync(filename)) {
    return require(filename)
  } else {
    return undefined
  }
}

module.exports = {
  appDirectory,
  resolveApp,
  safeGetFile
}