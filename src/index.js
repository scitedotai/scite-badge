import { main, insertBadges } from './main'

main()

console.log('defining scite on window', window)
window.__SCITE = {
  insertBadges,
  version: __VERSION__
}
