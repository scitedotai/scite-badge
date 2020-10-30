import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Manager, Reference, Popper } from 'react-popper'
import { Count } from 'scite-widget'
import styles from '../styles/Tooltip.css'

const Tally = ({ className, tally, notices }) => (
  <div className={classNames(styles.tally, className)}>
    {notices && notices.length > 0 && (
      <div className={styles.notices}>
        {notices.map((status, i) => (
          <div key={`${i}-${status}`} className={styles.notice}>
            <div className={styles.tallyCounts}>
              <Count type='notices' />
            </div>
            <div className={styles.labels}>
              {(status === 'Retracted' || status === 'Withdrawn') ? (
                <span className={classNames(styles.noticeCopy, styles[status])}>
                This paper has been {status.toLowerCase()}
                </span>
              ) : (
                <span className={classNames(styles.noticeCopy, styles[status])}>
                  This paper {status.toLowerCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )}

    <div className={styles.tallyCounts}>
      <Count type='supporting' count={tally && tally.supporting ? tally.supporting.toLocaleString() : 0} />
      <Count type='mentioning' count={tally && tally.mentioning ? tally.mentioning.toLocaleString() : 0} />
      <Count type='disputing' count={tally && tally.contradicting ? tally.contradicting.toLocaleString() : 0} />
    </div>
    <div className={styles.labels}>
      <span className={styles.label}>Supporting</span>
      <span className={styles.label}>Mentioning</span>
      <span className={styles.label}>Disputing</span>
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
      see all citations for this article at <Link href='https://scite.ai'>scite.ai</Link>
    </p>
    <p>
      scite is a platform that combines deep learning with expert
      analysis to automatically classify citations as supporting,
      disputing or mentioning.
    </p>
  </div>
)

const TooltipContent = ({ tally, notices }) => (
  <div className={styles.tooltipContent}>
    <img className={styles.logo} src='https://cdn.scite.ai/assets/images/logo.svg' />
    <span className={styles.slogan}>Citation Statements</span>

    <Tally tally={tally} notices={notices} />
    {tally && <a className={styles.button} href={`https://scite.ai/reports/${tally.doi}`} target='_blank' rel='noopener noreferrer'>View Citations</a>}
    <Message />
  </div>
)

const TooltipPopper = ({
  className,
  show,
  doi,
  tally,
  notices,
  placement,
  flip,
  slide,
  handleMouseEnter,
  handleMouseLeave
}) => {
  let updatePosition
  // XXX: Hack to fix positioning on first load, sorry
  useEffect(() => {
    if (updatePosition) {
      setTimeout(updatePosition)
    }
  }, [tally])

  const handleClickTooltip = () => {
    window.open(`https://scite.ai/reports/${doi}`)
  }

  return (
    <Popper
      placement={placement}
      strategy='fixed'
      modifiers={[
        {
          name: 'preventOverflow',
          options: {
            mainAxis: false
          }
        },
        {
          name: 'offset',
          options: {
            offset: [slide || 0, 12]
          }
        },
        {
          name: 'flip',
          options: flip ? {} : {
            fallbackPlacements: []
          }
        }
      ]}
    >
      {({ ref, style, placement, arrowProps, update }) => {
        updatePosition = update

        return (
          <div
            ref={ref}
            className={
              classNames(styles.tooltip, {
                [styles.tooltipShow]: show
              })
            }
            style={style}
            data-placement={placement}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickTooltip}
          >
            <TooltipContent tally={tally} notices={notices} />
          </div>
        )
      }}
    </Popper>
  )
}

export const Tooltip = ({ doi, tally, notices, showZero, placement = 'top', flip, slide = 0, children }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let hideTooltipIntvl
  let showTooltipIntvl

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
      <TooltipPopper
        show={showTooltip && !(tally && tally.total === 0 && !showZero)}
        doi={doi}
        tally={tally}
        notices={notices}
        placement={placement}
        flip={flip}
        slide={slide}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </Manager>
  )
}
export default Tooltip
