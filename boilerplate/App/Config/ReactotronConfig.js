import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron, { overlay, trackGlobalErrors } from 'reactotron-react-native'

if (Config.useReactotron) {
  Reactotron
    .configure({
      // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
      name: 'Ignite App' // would you like to see your app's name?
    })

    // forward all errors to Reactotron
    .use(trackGlobalErrors({
      // ignore all error frames from react-native (for example)
      veto: (frame) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))

    // add overlay ability for graphics
    .use(overlay())

    // let's connect!
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
