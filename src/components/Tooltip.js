import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Manager, Reference, Popper } from 'react-popper'
import { Count } from 'scite-widget'

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

const TooltipMessage = ({ className }) => (
  <div className={classNames('scite-tooltip-message', className)}>
    <p>
      scite is a platform that combines deep learning with expert
      analysis to automatically classify citations as supporting,
      contradicting or mentioning.
    </p>
  </div>
)

const TooltipContent = ({ tally }) => (
  <div className='scite-tooltip-content'>
    <span className='scite-title'>scite_</span>
    <span className='slogan'>Making Science Reliable</span>

    <TooltipTally tally={tally} />
    {tally && <a className='scite-button button' href={`https://scite.ai/reports/${tally.doi}`} target='_blank' rel='noopener noreferrer'>View Citations</a>}
    <TooltipMessage className='message' />
  </div>
)

const handleMouseEnter = ({
  hideTooltipIntvl,
  setShowTooltip
}) => () => {
  if (hideTooltipIntvl) {
    clearTimeout(hideTooltipIntvl)
  }
  setShowTooltip(true)
}

const handleMouseLeave = ({
  hideTooltipIntvl,
  setShowTooltip
}) => () => {
  hideTooltipIntvl = setTimeout(() => {
    setShowTooltip(false)
  }, 300)
}

export const Tooltip = ({ tally, children }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let hideTooltipIntvl

  const classes = {
    tooltip: classNames('scite-tooltip', {
      '-show': showTooltip
    })
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            ref={ref}
            onMouseEnter={handleMouseEnter({ setShowTooltip, hideTooltipIntvl })}
            onMouseLeave={handleMouseLeave({ setShowTooltip, hideTooltipIntvl })}
          >
            {children}
          </div>
        )}
      </Reference>

      <Popper placement='top'>
        {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
          <div
            ref={ref}
            className={classes.tooltip}
            style={style}
            data-placement={placement}
            onMouseEnter={handleMouseEnter({ setShowTooltip, hideTooltipIntvl })}
            onMouseLeave={handleMouseLeave({ setShowTooltip, hideTooltipIntvl })}
          >
            <TooltipContent tally={tally} />
            <div className='scite-tooltip-arrow' ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    </Manager>
  )
}
export default Tooltip
