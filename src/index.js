import 'whatwg-fetch'

import { h, render } from 'preact'
import { Tally } from 'scite-extension'
import 'scite-extension/src/styles.css'
import './styles.css'

function insertBadges () {
  const badges = document.querySelectorAll('.scite-badge')
  for (const badge of badges) {
    const data = badge.dataset
    const showZero = data.showZero === 'true'
    badge.innerHTML = ''
    render(
      <Tally
        doi={data.doi}
        horizontal={data.layout === 'horizontal'}
        showZero={showZero}
        isBadge
      />,
      badge)
  }
}

window.addEventListener('load', () => insertBadges())

window.__SCITE = {
  insertBadges
}
