import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tally } from 'scite-widget'
import { fetchNotices, fetchTallies } from './scite'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/main.css'
import './styles/index.css'

const BATCH_SIZE = 500

export function getConfig (el) {
  const data = el.dataset
  const config = {}
  const doi = getDOI(el)
  if (doi) {
    config.doi = doi
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

  if (data.small) {
    config.small = data.small === 'true'
  }

  return config
}

function getDOI (el) {
  const data = el.dataset
  let doi

  if (data.doi && /^meta:/.test(data.doi)) {
    const metaName = data.doi.split('meta:').join('')
    const selector = `meta[name='${metaName}']`
    const meta = document.querySelector(selector)

    if (meta) {
      doi = meta.getAttribute('content')
    } else {
      console.warn(`Scite badge could not find meta tag with name="${metaName}"`)
    }
  } else if (data.doi) {
    doi = data.doi
  }
  return doi
}

export function insertBadge (el, tally, notices) {
  const config = getConfig(el)
  const doi = config.doi
  const showZero = config.showZero || false
  const horizontal = config.horizontal || false
  const placement = config.placement || 'top'
  const showLabels = config.showLabels || false
  const slide = config.slide || 0
  const small = config.small || false

  //
  // Don't ever flip tooltip if they specify placement
  //
  const flip = !config.placement

  unmountComponentAtNode(el)

  render(
    (
      <Tooltip
        doi={doi}
        tally={tally}
        showZero={showZero}
        placement={placement}
        flip={flip}
        slide={slide}
        notices={notices}
      >
        <Tally
          tally={tally}
          horizontal={horizontal}
          showZero={showZero}
          showLabels={showLabels}
          notices={notices}
          small={small}
          isBadge
        />
      </Tooltip>
    ),
    el
  )
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

export async function insertBadges () {
  if (!document.body) {
    return []
  }

  const configEls = document.querySelectorAll('.scite-badge-config')
  for (const el of configEls) {
    insertBadgeWrapper(el)
  }

  const badges = document.querySelectorAll('.scite-badge')
  let dois = []
  for (const badge of badges) {
    dois.push(getDOI(badge))
  }

  if (dois.length === 0) {
    return badges
  }

  dois = [...new Set(dois)]

  const pages = Math.ceil(dois.length / BATCH_SIZE)
  for (let i = 0; i < pages; i++) {
    const currentDOIs = dois.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE)
    const [{ tallies }, { notices }] = await Promise.all([fetchTallies(currentDOIs), fetchNotices(currentDOIs)])

    for (const badge of badges) {
      const doi = getDOI(badge)
      if (doi in tallies) {
        insertBadge(badge, tallies[doi], notices[doi])
      }
    }
  }

  return badges
}

export async function main () {
  const badges = await insertBadges()
  //
  // If we didn't find any, try waiting for document load
  // we may have been inserted further up the page
  //
  if (badges.length === 0) {
    window.addEventListener('load', insertBadges)
  }
}
