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
    el.dataset.targetEl = '.my-container'
    el.dataset.insertBefore = 'false'

    const config = main.getConfig(el)
    expect(config.doi).toBe('10.bingbong')
    expect(config.showZero).toBe(false)
    expect(config.horizontal).toBe(true)
    expect(config.placement).toBe('bottom')
    expect(config.showLabels).toBe(true)
    expect(config.targetEl).toBe('.my-container')
    expect(config.insertBefore).toBe(false)
  })
})

describe('replaceTooltipsWrapper', () => {
  it('can insert a new wrapper', () => {
    const initialWrapper = document.querySelector('.scite-tooltips-wrapper')
    main.replaceTooltipsWrapper('scite-tooltips-wrapper')
    const newWrapper = document.querySelector('.scite-tooltips-wrapper')

    expect(initialWrapper).toBeNull()
    expect(newWrapper).toBeTruthy()
    expect(newWrapper.className).toBe('scite-tooltips-wrapper')
  })

  it('can replace an existing wrapper', () => {
    const initialWrapper = document.querySelector('.scite-tooltips-wrapper')
    main.replaceTooltipsWrapper('scite-tooltips-wrapper')
    const newWrapper = document.querySelector('.scite-tooltips-wrapper')

    expect(initialWrapper).toBeTruthy()
    expect(newWrapper).toBeTruthy()
    expect(newWrapper.className).toBe('scite-tooltips-wrapper')
    expect(newWrapper).not.toBe(initialWrapper)
  })
})

describe('insertBadgeWrapper', () => {
  it('inserts badge into specified element', () => {
    const myContainer = document.createElement('div')
    myContainer.className = 'my-container'
    document.body.appendChild(myContainer)

    const myConfig = document.createElement('div')
    myConfig.dataset.targetEl = '.my-container'
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
    myConfig.dataset.targetEl = '.my-container > .node-2'
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
  it('runs on load if there are no badges', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener')

    main.main()

    expect(addEventListener).toBeCalledTimes(1)
    expect(addEventListener).toBeCalledWith('load', main.insertBadges)
  })
})
