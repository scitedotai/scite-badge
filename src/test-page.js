import React from 'react'
import { render } from 'react-dom'

const rows = [
  {
    doi: '10.1891/0889-8391.13.2.158',
    layout: 'horizontal'
  },
  {
    doi: '10.1891/0889-8391.13.2.158',
    layout: 'vertical'
  },
  {
    doi: '10.notrealjoaifds',
    layout: 'vertical'
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  }
]

const Row = ({ doi, layout }) => (
  <div className='badge-row'>
    <p className='paper'>
      etsi vereor, iudices, ne turpe sit pro fortissimo viro dicere incipientem timere minimeque deceat, cum T. Annius ipse magis de rei publicae salute quam de sua perturbetur1, me ad eius causam parem animi magnitudinem adferre non posse, tamen haec novi iudici nova forma terret oculos qui, quocumque inciderunt, veterem consuetudinem fori et pristinum morem iudiciorum requirunt.
    </p>
    <div
      className='scite-badge'
      data-doi={doi}
      data-layout={layout}
      data-show-labels='true'
    />
  </div>
)

const App = () => (
  <div className='badges'>
    {rows.map(({ doi, layout }, id) => (
      <Row key={id} doi={doi} layout={layout} />
    ))}
  </div>
)

const app = document.querySelector('#app')
render(<App />, app)
