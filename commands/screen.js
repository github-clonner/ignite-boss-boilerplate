// @cliDescription Generate a screen
// Generates a "screen"

module.exports = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { parameters, strings, print, ignite } = context
  const { pascalCase, isBlank } = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`ignite generate screen <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = pascalCase(parameters.first)
  const props = { name }

  // Copies the `screen.js.ejs` in your plugin's templates folder
  // into App/screens/${name}.js.
  const jobs = [{
    template: 'screen.js.ejs',
    target: `App/Screens/${name}.js`
  }]

  // make the templates and pass in props with the third argument here
  await ignite.copyBatch(context, jobs, props)
}
