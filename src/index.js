#!/usr/bin/env node
'use strict'

// Observable polyfill
require('any-observable/register/rxjs-all') // eslint-disable-line import/no-unassigned-import

const fs = require('fs')
const path = require('path')
const Listr = require('listr')
const Observable = require('any-observable')
const { resolveApp, safeGetFile } = require('./utilities/paths')
const { log, numerate } = require('./utilities/shell')
const prompts = require('./prompts')
const {
  resolveDependencies,
  updateDependencies,
  installDependencies
} = require('./tasks')

const pendo = () => {
  // Initial newline
  log()
  log(prompts.intro)
  log()

  const config = {
    pkg: null,
    pendo: null,
    subDeps: null,
  }
  const taskList = []

  taskList.push({
    title: 'Locating',
    emoji: '🔎',
    task: () => {
      config.pkg = safeGetFile(resolveApp('package.json'))
      config.pendo = safeGetFile(resolveApp('pendo.json'))

      return new Promise((resolve, reject) => {
        if (!config.pkg) {
          reject(new Error(prompts.noPkg))
        }
        if (!config.pendo) {
          reject(new Error(prompts.noPendoRc))
        }
        resolve(prompts.yesConfig)
      })
    },
  })

  taskList.push({
    title: 'Resolving',
    emoji: '📦',
    task: () => {
      return new Promise((resolve, reject) => {
        resolveDependencies(config, (newConfig) => {
          config.subDeps = newConfig.subDeps
        })
        resolve(prompts.resolveComplete)
      })
    },
  })

  taskList.push({
    title: 'Updating',
    emoji: '✨',
    task: () => {
      return new Promise((resolve, reject) => {
        updateDependencies(config)
        resolve(prompts.updateComplete)
      })
    },
  })

  taskList.push({
    title: 'Installing',
    emoji: '🚚',
    task: () => {
      return new Observable(observer => {
        observer.next(prompts.install)
        installDependencies(config, {
          log: message => {
            observer.next(message)
          },
          error: message => {
            observer.next(message)
          },
        }).then(() => {
          observer.next(prompts.installComplete)
          observer.complete()
        })
      })
    },
  })

  const tasks = new Listr(numerate(taskList))

  tasks
    .run()
    .then(() => {
      log()
      log(prompts.complete)
      log()
    })
    .catch(() => process.exit(1))
}

module.exports = pendo
