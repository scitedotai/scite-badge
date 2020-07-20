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
  },
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical',
    placement: 'left'
  }
]

const Badge = ({ doi, layout, showLabels, placement }) => (
  <div
    className='scite-badge'
    data-doi={doi}
    data-layout={layout}
    data-show-labels={String(!!showLabels)}
    data-tooltip-placement={placement}
  />
)

const Row = ({ doi, layout, showLabels, placement }) => (
  <div className='badge-row'>
    <p className='paper'>
      etsi vereor, iudices, ne turpe sit pro fortissimo viro dicere incipientem timere minimeque deceat, cum T. Annius ipse magis de rei publicae salute quam de sua perturbetur1, me ad eius causam parem animi magnitudinem adferre non posse, tamen haec novi iudici nova forma terret oculos qui, quocumque inciderunt, veterem consuetudinem fori et pristinum morem iudiciorum requirunt.
    </p>
    <Badge
      doi={doi}
      layout={layout}
      showLabels={showLabels}
      placement={placement}
    />
  </div>
)

const App = () => (
  <div>
    <div className='scite-badge-config' data-target-el='.special-container > .foobar' data-insert-before='true' data-doi='10.1016/j.biopsych.2005.08.012' data-tooltip-placement='right' />
    <div className='scite-badge-config' data-target-el='.special-container' data-doi='10.1891/0889-8391.13.2.158' data-tooltip-placement='right' />

    <div className='badges'>
      {
        rows.map((props, id) => (
          <Row key={id} {...props} />
        ))
      }
    </div>

    <div className='narrow'>
      <Row doi='10.1016/j.biopsych.2005.08.012' layout='vertical' />
    </div>
    <div className='wide'>
      <Badge
        doi='10.1016/j.biopsych.2005.08.012'
        layout='vertical'
        showLabels={false}
        placement='top'
      />
    </div>
    <div className='wide'>
      <Badge
        doi='10.1016/j.biopsych.2005.08.012'
        layout='horizontal'
        showLabels={false}
        placement='top'
      />
    </div>

    <div className='special-container'>
      <div>Some random stuff they like</div>
      <div className='foobar'>Some other random stuff they like</div>
    </div>
  </div>
)

const app = document.querySelector('#app')
render(<App />, app)
