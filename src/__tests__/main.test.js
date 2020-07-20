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

describe('insertBadgeWrapper', () => {
  it('inserts badge into specified element', () => {
    const myContainer = document.createElement('div')
    myContainer.className = 'my-container'
    document.body.appendChild(myContainer)

    const myConfig = document.createElement('div')
    myConfig.dataset.appendTo = '.my-container'
    myConfig.dataset.doi = '10.bingbong'

    main.insertBadgeWrapper(myConfig)

    expect(myContainer.children.length).toBe(1)
    expect(myContainer.children[0].className).toBe('scite-badge')
    expect(myContainer.children[0].dataset.doi).toBe('10.bingbong')

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

    const myConfig = document.createElement('div')
    myConfig.dataset.appendTo = '.my-container > .node-2'
    myConfig.dataset.insertBefore = 'true'
    myConfig.dataset.doi = '10.bingbong'

    main.insertBadgeWrapper(myConfig)

    expect(myContainer.children.length).toBe(3)
    expect(myContainer.children[0].className).toBe('node-1')
    expect(myContainer.children[1].className).toBe('scite-badge')
    expect(myContainer.children[1].dataset.doi).toBe('10.bingbong')
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
