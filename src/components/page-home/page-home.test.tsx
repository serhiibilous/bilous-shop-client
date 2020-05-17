import React from 'react'
import renderer from 'react-test-renderer'

import { PageHome } from 'Components'

describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<PageHome />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
