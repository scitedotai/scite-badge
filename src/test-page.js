import React from 'react'
import { render } from 'react-dom'

const rows = [
  {
    doi: '10.1016/j.biopsych.2005.08.012',
    layout: 'vertical'
  }
]

const Row = ({ doi, layout }) => (
  <div className='badge-row'>
    <p>jfaosdifjoipadjfiopajdfopi jfdoi jopiadj fopiajd foipjadf opijadfopijasdfoipjsad fiopjasd oipfjas dfioj asfio aoidfjoiadjf oiafdjoaifdjoaifdjoiapfdjoipaj foi oij oi</p>
    <p>jfaosdifjoipadjfiopajdfopi jfdoi jopiadj fopiajd foipjadf opijadfopijasdfoipjsad fiopjasd oipfjas dfioj asfio aoidfjoiadjf oiafdjoaifdjoaifdjoiapfdjoipaj foi oij oi</p>
    <p>jfaosdifjoipadjfiopajdfopi jfdoi jopiadj fopiajd foipjadf opijadfopijasdfoipjsad fiopjasd oipfjas dfioj asfio aoidfjoiadjf oiafdjoaifdjoaifdjoiapfdjoipaj foi oij oi</p>
    <div
      className='scite-badge'
      data-doi={doi}
      data-layout={layout}
    />
    <p>jfaosdifjoipadjfiopajdfopi jfdoi jopiadj fopiajd foipjadf opijadfopijasdfoipjsad fiopjasd oipfjas dfioj asfio aoidfjoiadjf oiafdjoaifdjoaifdjoiapfdjoipaj foi oij oi</p>
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
