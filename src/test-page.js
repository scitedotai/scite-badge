import React from 'react'
import { render } from 'react-dom'

const rows = [
  {
    doi: '10.1891/0889-8391.13.2.158',
    layout: 'vertical',
    showLabels: true
  },
  {
    doi: '10.notrealjoaifds',
    layout: 'vertical'
  },
  {
    doi: '10.1891/0889-8391.13.2.158',
    layout: 'horizontal',
    showLabels: true
  },
  {
    doi: '10.1891/0889-8391.13.2.158',
    layout: 'horizontal',
    showLabels: false
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical',
    showLabels: false
  }
]

const Row = ({ doi, layout, showLabels }) => (
  <div className='badge-row'>
    <p className='paper'>
      etsi vereor, iudices, ne turpe sit pro fortissimo viro dicere incipientem timere minimeque deceat, cum T. Annius ipse magis de rei publicae salute quam de sua perturbetur1, me ad eius causam parem animi magnitudinem adferre non posse, tamen haec novi iudici nova forma terret oculos qui, quocumque inciderunt, veterem consuetudinem fori et pristinum morem iudiciorum requirunt.
    </p>
    <div
      className='scite-badge'
      data-doi={doi}
      data-layout={layout}
      data-show-labels={String(!!showLabels)}
    />
  </div>
)

const App = () => (
  <div>
    <div className='badges'>
      {
        rows.map(({ doi, layout, showLabels }, id) => (
          <Row key={id} doi={doi} layout={layout} showLabels={showLabels} />
        ))
      }
    </div>

    <div className='narrow'>
      <Row doi='10.1016/j.biopsych.2005.08.012' layout='vertical' />
    </div>
  </div>
)

const app = document.querySelector('#app')
render(<App />, app)
