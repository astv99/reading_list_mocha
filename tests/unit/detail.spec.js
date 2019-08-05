import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Detail from '@/views/Detail.vue'

describe('Detail.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Detail, {})
    expect(wrapper.isVueInstance).to.be.ok
  })
  it('renders props when passed', () => {
    const wrapper = shallowMount(Detail, {
      propsData: {
        title: 'New Title',
        author: 'Name',
      }
    })
    const h3 = wrapper.find('h3')
    const p = wrapper.find('p.subheading__info');
    expect(p.text()).to.equal('Name')
  })
})
