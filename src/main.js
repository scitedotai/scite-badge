import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tally, TallyLoader } from 'scite-widget'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/main.css'
import './styles/index.css'

export function getConfig (el) {
  const data = el.dataset
  const config = {}

  if (data.doi && /^meta:/.test(data.doi)) {
    const metaName = data.doi.split('meta:').join('')
    const selector = `meta[name='${metaName}']`
    const meta = document.querySelector(selector)

    if (meta) {
      config.doi = meta.getAttribute('content')
    } else {
      console.warn(`Scite badge could not find meta tag with name="${metaName}"`)
    }
  } else if (data.doi) {
    config.doi = data.doi
  }

  if (data.showZero) {
    config.showZero = data.showZero === 'true'
  }

  if (data.layout) {
    config.horizontal = data.layout === 'horizontal'
  }

  if (data.tooltipPlacement) {
    config.placement = data.tooltipPlacement
  }

  if (data.tooltipSlide) {
    config.slide = Number(data.tooltipSlide)
  }

  if (data.showLabels) {
    config.showLabels = data.showLabels === 'true'
  }

  if (data.targetEl) {
    config.targetEl = data.targetEl
  }

  if (data.insertBefore) {
    config.insertBefore = data.insertBefore === 'true'
  }

  return config
}

export function insertBadge (el, tooltipsWrapper) {
  const config = getConfig(el)
  const doi = config.doi
  const showZero = config.showZero || false
  const horizontal = config.horizontal || false
  const placement = config.placement || 'top'
  const showLabels = config.showLabels || false
  const slide = config.slide || 0

  //
  // Don't ever flip tooltip if they specify placement
  //
  const flip = !config.placement

  unmountComponentAtNode(el)

  const tooltipWrapper = document.createElement('div')
  tooltipWrapper.className = 'scite-tooltip-wrapper'
  tooltipWrapper.dataset.doi = doi
  tooltipsWrapper.appendChild(tooltipWrapper)

  render(
    (
      <TallyLoader doi={doi}>
        {({ tally }) => (
          <Tooltip
            doi={doi}
            tally={tally}
            showZero={showZero}
            placement={placement}
            flip={flip}
            slide={slide}
          >
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
    el
  )
}

export function replaceTooltipsWrapper (className = 'scite-tooltips-wrapper') {
  const tooltipsWrapper = document.createElement('div')
  tooltipsWrapper.className = className

  const currentWrapper = document.querySelector(`.${className}`)
  if (currentWrapper) {
    document.body.removeChild(currentWrapper)
  }

  document.body.appendChild(tooltipsWrapper)

  return tooltipsWrapper
}

/**
 * If the user cannot insert a div with config/class
 * we want, insert the wrapper ourselves as an escape hatch */
export function insertBadgeWrapper (configEl) {
  const { targetEl, insertBefore } = getConfig(configEl)

  const el = document.querySelector(targetEl)
  const badgeWrapper = document.createElement('div')
  badgeWrapper.className = 'scite-badge'

  //
  // Forward config to element
  //
  const configKeys = Object.keys(configEl.dataset)
  for (const key of configKeys) {
    badgeWrapper.dataset[key] = configEl.dataset[key]
  }

  if (!el) {
    console.warn('Scite badge: could not find element to insert badge wrapper into')
  }

  if (insertBefore) {
    const parent = el.parentNode
    parent.insertBefore(badgeWrapper, el)
  } else {
    el.appendChild(badgeWrapper)
  }

  return badgeWrapper
}

export function insertBadges () {
  if (!document.body) {
    return []
  }

  const configEls = document.querySelectorAll('.scite-badge-config')
  for (const el of configEls) {
    insertBadgeWrapper(el)
  }

  const badges = document.querySelectorAll('.scite-badge')
  const tooltipsWrapper = replaceTooltipsWrapper('scite-tooltips-wrapper')

  for (const badge of badges) {
    insertBadge(badge, tooltipsWrapper)
  }

  return badges
}

export function main () {
  const badges = insertBadges()

  //
  // If we didn't find any, try waiting for document load
  // we may have been inserted further up the page
  //
  if (badges.length === 0) {
    window.addEventListener('load', insertBadges)
  }
}
