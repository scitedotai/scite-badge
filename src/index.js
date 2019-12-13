import React from 'react'
import { render } from 'react-dom'
import { Tally, TallyLoader } from 'scite-widget'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/main.css'
import './styles/index.css'

function insertBadges () {
  const badges = document.querySelectorAll('.scite-badge')
  for (const badge of badges) {
    const data = badge.dataset
    const showZero = data.showZero === 'true'
    badge.innerHTML = ''
    render(
      (
        <TallyLoader doi={data.doi}>
          {({ tally }) => (
            <Tooltip tally={tally}>
              <Tally
                tally={tally}
                horizontal={data.layout === 'horizontal'}
                showZero={showZero}
                isBadge
              />
            </Tooltip>
          )}
        </TallyLoader>
      ),
      badge)
  }
}

window.addEventListener('load', () => insertBadges())

window.__SCITE = {
  insertBadges
}
