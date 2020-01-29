import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Manager, Reference, Popper } from 'react-popper'
import { Count, TextLogo } from 'scite-widget'
import styles from '../styles/Tooltip.css'

const Tally = ({ className, tally }) => (
  <div className={classNames(styles.tally, className)}>
    <div className={styles.tallyCounts}>
      <Count type='supporting' count={tally ? tally.supporting : 0} />
      <Count type='mentioning' count={tally ? tally.mentioning : 0} />
      <Count type='contradicting' count={tally ? tally.contradicting : 0} />
    </div>
    <div className={styles.labels}>
      <span className={styles.label}>Supporting</span>
      <span className={styles.label}>Mentioning</span>
      <span className={styles.label}>Contradicting</span>
    </div>
  </div>
)

const Link = ({ className, href, children }) => (
  <a className={classNames(styles.link, className)} href={href} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
)

const Message = ({ className }) => (
  <div className={classNames(styles.message, className)}>
    <p className={styles.bold}>
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
  <div className={styles.tooltipContent}>
    <TextLogo />
    <span className={styles.slogan}>Citation Statements</span>

    <Tally tally={tally} />
    {tally && <a className={styles.button} href={`https://scite.ai/reports/${tally.doi}`} target='_blank' rel='noopener noreferrer'>View Citations</a>}
    <Message />
  </div>
)

export const Tooltip = ({ tally, showZero, children }) => {
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
    tooltip: classNames(styles.tooltip, {
      [styles.tooltipShow]: showTooltip && !(tally && tally.total === 0 && !showZero)
    })
  }

  // XXX: Hack to fix positioning on first load, sorry
  useEffect(() => updatePosition && updatePosition(), [tally])

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            className={styles.reference}
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
