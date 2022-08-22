import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WithChildrenComponentsListItem from '../WithChildrenComponentsListItem.vue'

describe('UnneededAbstractionsList', () => {
  it('renders properly', () => {
    const c = {
      name: 'Name',
      population: 111,
      capital: 'Capital',
      region: 'Region',
      subregion: 'Subregion',
      flags: {
        png: 'something.png'
      },
      HIGHLIGHT: false
    }
    const wrapper = mount(WithChildrenComponentsListItem, { props: { c } })
    expect(wrapper.find('header').text()).toContain(c.name)
  })
})
