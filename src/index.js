import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tally, TallyLoader } from 'scite-widget'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/main.css'
import './styles/index.css'

function insertBadges () {
  const badges = document.querySelectorAll('.scite-badge')
  for (const badge of badges) {
    const data = badge.dataset
    const showZero = data.showZero === 'true'
    const horizontal = data.layout === 'horizontal'
    const placement = data.tooltipPlacement || 'top'
    const showLabels = data.showLabels === 'true'

    unmountComponentAtNode(badge)

    render(
      (
        <TallyLoader doi={data.doi}>
          {({ tally }) => (
            <Tooltip tally={tally} showZero={showZero} placement={placement}>
              <Tally
                tally={tally}
                horizontal={horizontal}
                showZero={showZero}
                showLabels={showLabels}
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
