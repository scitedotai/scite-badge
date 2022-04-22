import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Tally, SectionTally } from 'scite-widget'
import { fetchNotices, fetchTallies, fetchSectionTallies } from './scite'
import Tooltip from './components/Tooltip'
import 'scite-widget/lib/index-with-fonts.css'
import './styles/index.css'

const BATCH_SIZE = 500

const HOST_NAME = window.location.hostname

export function getConfig (el) {
  const data = el.dataset
  const config = {}
  const doi = getDOI(el)
  if (doi) {
    config.doi = doi
  }

  if (data.showTally) {
    // If data.showTally is set, check if is 'true'.
    // If it is not set, default to true for backwards compatibility.
    // Cannot just do data.showTally || true because if it is passed in as 'false',
    //   it will be overwritten to true.
    config.showTally = data.showTally !== null ? data.showTally === 'true' : true
  }

  if (data.showSectionTally) {
    config.showSectionTally = data.showSectionTally === 'true'
  }

  if (data.showLogo) {
    config.showLogo = data.showLogo === 'true'
  }

  if (data.chartType) {
    config.chartType = data.chartType
  }

  if (data.showZero) {
    config.showZero = data.showZero === 'true'
  }

  if (data.forceCollapse) {
    config.forceCollapse = data.forceCollapse === 'true'
  }

  if (data.layout) {
    config.horizontal = data.layout === 'horizontal'
  }

  if (data.layoutSectionTally) {
    config.horizontalSectionTally = data.layoutSectionTally === 'horizontal'
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

  if (data.campaign) {
    config.campaign = data.campaign
  }

  if (data.autologin) {
    config.autologin = data.autologin
  }

  if (data.rewardfulId) {
    config.rewardfulID = data.rewardfulId
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
  return doi && doi.toLowerCase().trim()
}

export function insertBadge (el, tally, notices, sectionTally) {
  const config = getConfig(el)

  const showTally = config.showTally || false
  const showSectionTally = config.showSectionTally || false
  const showBothTallies = showTally && showSectionTally

  const doi = config.doi
  const showZero = config.showZero || false
  const forceCollapse = config.forceCollapse || false
  const horizontal = config.horizontal || false
  const placement = config.placement || 'top'
  const showLabels = config.showLabels || false
  const slide = config.slide || 0
  const small = config.small || false
  const campaign = config.campaign || undefined
  const autologin = config.autologin || undefined
  const rewardfulID = config.rewardfulID || undefined
  const showLogo = config.showLogo || true

  // Section Tally related values
  const chartType = config.chartType || null
  const horizontalSectionTally = config.horizontalSectionTally

  //
  // Don't ever flip tooltip if they specify placement
  //
  const flip = !config.placement

  // If element is already existing on another react DOM
  // this method can throws an exception but does remove the node
  try {
    unmountComponentAtNode(el)
  } catch (_) {
    console.warn('Scite badge: unmounting component on another react DOM')
  }

  if (showBothTallies) {
    render(
      (
        <>
          <div style={{ display: 'inline-block', 'margin-bottom': '4px' }}>
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
                forceCollapse={forceCollapse}
                showLabels={showLabels}
                notices={notices}
                small={small}
                source={HOST_NAME}
                campaign={campaign}
                autologin={autologin}
                rewardfulID={rewardfulID}
                isBadge
                showLogo={showLogo}
              />
            </Tooltip>
          </div>
          <div>
            <SectionTally
              tally={sectionTally}
              horizontal={horizontalSectionTally}
              showZero={showZero}
              forceCollapse={forceCollapse}
              showLabels={showLabels}
              small={small}
              source={HOST_NAME}
              campaign={campaign}
              autologin={autologin}
              rewardfulID={rewardfulID}
              isBadge
              chartType={chartType}
              showLogo={false}
            />
          </div>
        </>
      ),
      el
    )
  } else if (showTally) {
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
            forceCollapse={forceCollapse}
            showLabels={showLabels}
            notices={notices}
            small={small}
            source={HOST_NAME}
            campaign={campaign}
            autologin={autologin}
            rewardfulID={rewardfulID}
            isBadge
            showLogo={showLogo}
          />
        </Tooltip>
      ),
      el
    )
  } else if (showSectionTally) {
    render(
      (
        <SectionTally
          tally={sectionTally}
          horizontal={horizontalSectionTally}
          showZero={showZero}
          forceCollapse={forceCollapse}
          showLabels={showLabels}
          small={small}
          source={HOST_NAME}
          campaign={campaign}
          autologin={autologin}
          rewardfulID={rewardfulID}
          isBadge
          chartType={chartType}
          showLogo={showLogo}
        />
      ),
      el
    )
  }
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

export async function insertBadges ({ forceReload } = {}) {
  if (!document.body) {
    return []
  }

  //
  // Note that for config we have already acted upon
  // we mark `injected` on the div to avoid re-injecting
  // the badge wrapper if the user calls `insertBadges`
  //
  const configEls = document.querySelectorAll('.scite-badge-config')
  for (const el of configEls) {
    if (el.dataset.injected === 'true') {
      continue
    }

    insertBadgeWrapper(el)
    el.dataset.injected = 'true'
  }

  const badges = document.querySelectorAll('.scite-badge')
  const badgesToLoad = []

  for (const badge of badges) {
    if (badge.dataset.fetched === 'true' && !forceReload) {
      continue
    }

    badgesToLoad.push(badge)
  }

  let dois = []
  for (const badge of badgesToLoad) {
    dois.push(getDOI(badge))
  }

  if (dois.length === 0) {
    return badges
  }

  dois = [...new Set(dois)]

  const pages = Math.ceil(dois.length / BATCH_SIZE)
  for (let i = 0; i < pages; i++) {
    const currentDOIs = dois.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE)

    const [{ tallies }, { notices }, { tallies: sectionTallies }] = await Promise.all([fetchTallies(currentDOIs), fetchNotices(currentDOIs), fetchSectionTallies(currentDOIs)])

    for (const badge of badgesToLoad) {
      const doi = getDOI(badge)
      if (doi in tallies) {
        insertBadge(badge, tallies[doi], notices[doi], sectionTallies[doi])
      } else {
        insertBadge(badge, { total: 0, citingPublications: 0 }, {}, {})
      }

      badge.dataset.fetched = 'true'
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
