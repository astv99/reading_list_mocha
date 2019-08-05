import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Home, {})
    expect(wrapper.isVueInstance).to.be.ok
  })
  it('contains a Main component', () => {
    const wrapper = shallowMount(Home, {})
    const main = wrapper.find('Main');
    expect(main).to.be.ok
  })
})
