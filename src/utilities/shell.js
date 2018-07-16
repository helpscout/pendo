const chalk = require('chalk')
const redent = require('redent')
const trimNewlines = require('trim-newlines')

/**
 * Prettifies text for console.log printing
 * @param   {object} text
 * @returns {string} - The reindented text.
*/
const log = (text) => {
  const prettyText = redent(trimNewlines((text || '').replace(/\t+\n*$/, '')), 0)
  console.log(prettyText)

  return prettyText
}

/**
 * Numerates a list of tasks for Listr.
 * @param   {array} tasks - An array of tasks for Listr
 * @returns {array}
 */
const numerate = tasks => {
  return tasks.map((task, index) => {
    const count = chalk.grey(`[${index+1}/${tasks.length}]`)
    const emoji = task.emoji ? ` ${task.emoji} ` : ''
    task.title = `${count}${emoji} ${task.title}`
    return task
  })
}

module.exports = {
  chalk,
  log,
  numerate
}
