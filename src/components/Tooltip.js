import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Manager, Reference, Popper } from 'react-popper'
import { Count, TextLogo } from 'scite-widget'
import '../styles/Tooltip.css'

const TooltipTally = ({ className, tally }) => (
  <div className={classNames('scite-tooltip-tally', className)}>
    <div className='scite-tooltip-tally-inner'>
      <Count className='scite-count' type='supporting' count={tally ? tally.supporting : 0} />
      <Count className='scite-count' type='mentioning' count={tally ? tally.mentioning : 0} />
      <Count className='scite-count' type='contradicting' count={tally ? tally.contradicting : 0} />
    </div>
    <div className='scite-tally-labels scite-labels'>
      <span className='scite-label'>Supporting</span>
      <span className='scite-label'>Mentioning</span>
      <span className='scite-label'>Contradicting</span>
    </div>
  </div>
)

const Link = ({ className, href, children }) => (
  <a className={classNames('scite-link', className)} href={href} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
)

const TooltipMessage = ({ className }) => (
  <div className={classNames('scite-tooltip-message', className)}>
    <p className='scite-bold'>
      see all citations for the article at <Link href='https://scite.ai'>scite.ai</Link>
    </p>
    <p>
      scite is a platform that combines deep learning with expert
      analysis to automatically classify citations as supporting,
      contradicting or mentioning.
    </p>
  </div>
)

const TooltipContent = ({ tally }) => (
  <div className='scite-tooltip-content'>
    <TextLogo />
    <span className='scite-slogan'>Citation Statements</span>

    <TooltipTally className='scite-tooltip-tally' tally={tally} />
    {tally && <a className='scite-button' href={`https://scite.ai/reports/${tally.doi}`} target='_blank' rel='noopener noreferrer'>View Citations</a>}
    <TooltipMessage />
  </div>
)

export const Tooltip = ({ tally, children }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let hideTooltipIntvl
  let showTooltipIntvl
  let updatePosition

  const handleMouseEnter = () => {
    if (hideTooltipIntvl) {
      clearTimeout(hideTooltipIntvl)
    }
    showTooltipIntvl = setTimeout(() => {
      setShowTooltip(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (showTooltipIntvl) {
      clearTimeout(showTooltipIntvl)
    }
    hideTooltipIntvl = setTimeout(() => {
      setShowTooltip(false)
    }, 300)
  }

  const handleClickTooltip = () => {
    window.open(`https://scite.ai/reports/${tally.doi}`)
  }

  const classes = {
    tooltip: classNames('scite-tooltip', {
      '-show': showTooltip
    })
  }

  // XXX: Hack to fix positioning on first load, sorry
  useEffect(() => updatePosition && updatePosition(), [tally])

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            className='scite-tooltip-reference'
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        )}
      </Reference>

      <Popper
        placement='top'
        modifiers={{ preventOverflow: { enabled: false } }}
      >
        {({ ref, style, placement, arrowProps, scheduleUpdate }) => {
          updatePosition = scheduleUpdate

          return (
            <div
              ref={ref}
              className={classes.tooltip}
              style={style}
              data-placement={placement}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClickTooltip}
            >
              <TooltipContent tally={tally} />
            </div>
          )
        }}
      </Popper>
    </Manager>
  )
}
export default Tooltip
