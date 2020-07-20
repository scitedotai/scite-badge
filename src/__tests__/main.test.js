/* eslint-env jest */

import * as main from '../main'

describe('getConfig', () => {
  it('blank config', () => {
    const el = document.createElement('div')
    const config = main.getConfig(el)
    const keys = Object.keys(config)

    expect(keys.length).toBe(0)
  })

  it('loads values', () => {
    const el = document.createElement('div')
    el.dataset.doi = '10.bingbong'
    el.dataset.showZero = 'false'
    el.dataset.layout = 'horizontal'
    el.dataset.tooltipPlacement = 'bottom'
    el.dataset.showLabels = 'true'
    el.dataset.appendTo = '.my-container'
    el.dataset.insertBefore = 'false'

    const config = main.getConfig(el)
    expect(config.doi).toBe('10.bingbong')
    expect(config.showZero).toBe(false)
    expect(config.horizontal).toBe(true)
    expect(config.placement).toBe('bottom')
    expect(config.showLabels).toBe(true)
    expect(config.appendTo).toBe('.my-container')
    expect(config.insertBefore).toBe(false)
  })
})

describe('defaultBoolConfig', () => {
  it('defaults correctly when there is no value', () => {
    expect(main.defaultBoolConfig('showZero', {}, {})).toBe(false)
  })

  it('overrides global with local config', () => {
    expect(main.defaultBoolConfig('showZero', { showZero: true }, { showZero: false })).toBe(true)
    expect(main.defaultBoolConfig('showZero', { showZero: false }, { showZero: true })).toBe(false)
    expect(main.defaultBoolConfig('showZero', { showZero: true }, {})).toBe(true)
  })

  it('falls back to global config', () => {
    expect(main.defaultBoolConfig('showZero', {}, { showZero: true })).toBe(true)
    expect(main.defaultBoolConfig('showZero', {}, { showZero: false })).toBe(false)
  })
})

describe('insertBadgeWrapper', () => {
  it('inserts badge into specified element', () => {
    const myContainer = document.createElement('div')
    myContainer.className = 'my-container'
    document.body.appendChild(myContainer)

    main.insertBadgeWrapper('.my-container')

    expect(myContainer.children.length).toBe(1)
    expect(myContainer.children[0].className).toBe('scite-badge')

    document.body.removeChild(myContainer)
  })

  it('inserts badge before specified element if we want', () => {
    const myContainer = document.createElement('div')
    myContainer.className = 'my-container'

    const node1 = document.createElement('div')
    node1.className = 'node-1'

    const node2 = document.createElement('div')
    node2.className = 'node-2'

    myContainer.appendChild(node1)
    myContainer.appendChild(node2)
    document.body.appendChild(myContainer)

    main.insertBadgeWrapper('.my-container > .node-2', true)

    expect(myContainer.children.length).toBe(3)
    expect(myContainer.children[0].className).toBe('node-1')
    expect(myContainer.children[1].className).toBe('scite-badge')
    expect(myContainer.children[2].className).toBe('node-2')

    document.body.removeChild(myContainer)
  })
})

describe('main', () => {
  const addEventListener = jest.spyOn(window, 'addEventListener')

  main.main()

  expect(addEventListener).toBeCalledTimes(1)
  expect(addEventListener).toBeCalledWith('load', main.insertBadges)
})
