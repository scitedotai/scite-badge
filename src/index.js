import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tally, TallyLoader } from 'scite-widget'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/main.css'
import './styles/index.css'

function insertBadges () {
  const badges = document.querySelectorAll('.scite-badge')
  const tooltipsWrapper = document.createElement('div')
  tooltipsWrapper.className = 'scite-tooltips-wrapper'

  const currentWrapper = document.querySelector('.scite-tooltips-wrapper')
  if (currentWrapper) {
    document.body.removeChild(currentWrapper)
  }
  document.body.appendChild(tooltipsWrapper)

  for (const badge of badges) {
    const data = badge.dataset
    const doi = data.doi
    const showZero = data.showZero === 'true'
    const horizontal = data.layout === 'horizontal'
    const placement = data.tooltipPlacement || 'top'
    const showLabels = data.showLabels === 'true'

    unmountComponentAtNode(badge)

    const tooltipWrapper = document.createElement('div')
    tooltipWrapper.className = 'scite-tooltip-wrapper'
    tooltipWrapper.dataset.doi = doi
    tooltipsWrapper.appendChild(tooltipWrapper)

    render(
      (
        <TallyLoader doi={doi}>
          {({ tally }) => (
            <Tooltip doi={doi} tally={tally} showZero={showZero} placement={placement}>
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
