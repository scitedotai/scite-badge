import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Manager, Reference, Popper } from 'react-popper'
import { Count, TextLogo } from 'scite-widget'
import '../styles/Tooltip.css'

const TooltipTally = ({ className, tally }) => (
  <div className={classNames('scite-tooltip-tally', className)}>
    <div className='tally'>
      <Count type='supporting' count={tally ? tally.supporting : 0} />
      <Count type='mentioning' count={tally ? tally.mentioning : 0} />
      <Count type='contradicting' count={tally ? tally.contradicting : 0} />
    </div>
    <div className='scite-tally-labels labels'>
      <span className='label'>Supporting</span>
      <span className='label'>Mentioning</span>
      <span className='label'>Contradicting</span>
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
    <p className='bold'>
      see all citations for the article at <Link className='link' href='https://scite.ai'>scite.ai</Link>
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
    <span className='slogan'>Making Science Reliable</span>

    <TooltipTally className='tally' tally={tally} />
    {tally && <a className='scite-button button' href={`https://scite.ai/reports/${tally.doi}`} target='_blank' rel='noopener noreferrer'>View Citations</a>}
    <TooltipMessage className='message' />
  </div>
)

export const Tooltip = ({ tally, children }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let hideTooltipIntvl
  let updatePosition

  const handleMouseEnter = () => {
    if (hideTooltipIntvl) {
      clearTimeout(hideTooltipIntvl)
    }
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    hideTooltipIntvl = setTimeout(() => {
      setShowTooltip(false)
    }, 300)
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
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        )}
      </Reference>

      <Popper placement='top'>
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
            >
              <TooltipContent tally={tally} />
              <div className='scite-tooltip-arrow' ref={arrowProps.ref} style={arrowProps.style} />
            </div>
          )
        }}
      </Popper>
    </Manager>
  )
}
export default Tooltip
