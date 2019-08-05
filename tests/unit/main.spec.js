import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Main from '@/components/Main.vue'

describe('Main.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Main, {})
    expect(wrapper.isVueInstance).to.be.ok
  })
})
