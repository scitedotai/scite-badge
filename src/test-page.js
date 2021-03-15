import React from 'react'
import { render } from 'react-dom'
import './styles/test.css'

const rows = [
  {
    doi: '10.1038/nature07404',
    layout: 'vertical',
    showLabels: true
  },
  {
    doi: '10.1038/nature07404',
    layout: 'vertical',
    showLabels: true,
    small: true
  },
  {
    doi: '10.notrealjoaifds',
    layout: 'vertical'
  },
  {
    doi: '10.1038/nature07404',
    layout: 'horizontal',
    showLabels: true
  },
  {
    doi: '10.1038/nature07404',
    layout: 'horizontal',
    showLabels: false
  },
  {
    doi: '10.1038/nature07404',
    layout: 'horizontal',
    showLabels: true,
    small: true
  },
  {
    doi: '10.1038/nature07404',
    layout: 'horizontal',
    showLabels: false,
    small: true
  },
  {
    doi: '10.1038/nature07404',
    layout: 'vertical',
    showLabels: false
  },
  {
    doi: '10.1038/nature07404',
    layout: 'vertical',
    showLabels: false,
    small: true
  },
  {
    doi: '10.1038/nature07404',
    layout: 'vertical',
    placement: 'left'
  }
]

const Badge = ({ doi, layout, showLabels, placement, small }) => (
  <div
    className='scite-badge'
    data-doi={doi}
    data-layout={layout}
    data-show-labels={String(!!showLabels)}
    data-tooltip-placement={placement}
    data-small={small}
    data-campaign='test'
  />
)

const Row = ({ doi, layout, showLabels, placement, small }) => (
  <div className='badge-row'>
    <p className='paper'>
      etsi vereor, iudices, ne turpe sit pro fortissimo viro dicere incipientem timere minimeque deceat, cum T. Annius ipse magis de rei publicae salute quam de sua perturbetur1, me ad eius causam parem animi magnitudinem adferre non posse, tamen haec novi iudici nova forma terret oculos qui, quocumque inciderunt, veterem consuetudinem fori et pristinum morem iudiciorum requirunt.
    </p>
    <Badge
      doi={doi}
      layout={layout}
      showLabels={showLabels}
      placement={placement}
      small={small}
    />
  </div>
)

const App = () => (
  <div>
    <meta name='article_doi' content='10.1891/0889-8391.13.2.158' />

    <div className='scite-badge-config' data-target-el='.special-container > .foobar' data-insert-before='true' data-doi='10.1016/j.biopsych.2005.08.012' data-tooltip-placement='right' />
    <div className='scite-badge-config' data-target-el='.special-container' data-doi='meta:article_doi' data-tooltip-placement='right' />

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
