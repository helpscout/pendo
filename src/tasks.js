const fs = require('fs')
const path = require('path')
const checkDependencies = require('check-dependencies')
const { resolveApp, safeGetFile } = require('./utilities/paths')

const getDependencies = config => config.pkg.dependencies

const getSubDependencies = config => {
  const subDirs = config.pendo.subDirectories
  return subDirs.map(dir => {
    const subPath = resolveApp(dir)
    const pkgPath = path.join(subPath, 'package.json')
    const pkg = safeGetFile(pkgPath) || {}

    return {
      path: subPath,
      pkgPath,
      pkg,
      dependencies: pkg.dependencies || {},
    }
  })
}

const resolveDependencies = config => {
  const dependencies = getDependencies(config)
  const subDeps = getSubDependencies(config)

  subDeps.map(sub => {
    return Object.assign(sub, {
      pkg: Object.assign(sub.pkg, {
        dependencies: Object.assign(sub.pkg.dependencies, dependencies),
      }),
    })
  })

  config.subDeps = subDeps
}

const updateDependencies = config => {
  config.subDeps.forEach(sub => {
    fs.writeFileSync(sub.pkgPath, JSON.stringify(sub.pkg, null, 2))
  })
}


const installDependencies = (config, options) => {
  return new Promise((resolve, reject) => {
    const queue = []

    config.subDeps.forEach(sub => {
      queue.push(
        checkDependencies(
          Object.assign(
            {
              checkGitUrls: true,
              install: true,
              packageDir: sub.pkgPath,
              packageManager: 'npm',
              verbose: false
            },
            options
          )
        )
      )
    })

    Promise.all(queue)
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  getDependencies,
  getSubDependencies,
  resolveDependencies,
  updateDependencies,
  installDependencies
}