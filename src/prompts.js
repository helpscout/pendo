const { EMOJI } = require('./constants')

const withEmoji = message => EMOJI + message

module.exports = {
  intro: withEmoji('Pendo: Your friendly package dependency resolver'),
  /**
   * Package.json
   */
  noPkg: `Hmm! Pendo couldn't find your main package.json 🔥`,
  noPendoConfig: `Hmm! Pendo couldn't find your pendo.json file 🔥`,
  yesConfig: `Spiffy! Pendo found your package.json and pendo.json`,

  resolveComplete: 'Resolving complete!',

  updateComplete: 'Updating complete!',

  install: 'Installing...',
  installComplete: 'Installing complete!',

  complete: withEmoji(`Dependencies resolved! Happy dev'ing ✨`)
}