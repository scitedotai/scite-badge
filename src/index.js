import { h, render } from 'preact'
import { Tally } from 'scite-extension'
import 'scite-extension/src/styles.css'
import './styles.css'

function insertBadges () {
  const badges = document.querySelectorAll('.scite-badge')
  for (let badge of badges) {
    const data = badge.dataset
    render(<Tally doi={data.doi} />, badge)
  }
}

window.addEventListener('load', () => insertBadges())
