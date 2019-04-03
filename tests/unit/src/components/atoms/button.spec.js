import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import fnmaButton from '@/components/atoms/button.vue';

describe('atoms/button.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'my button';
    const wrapper = shallowMount(fnmaButton, {
      slots: { default: msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
