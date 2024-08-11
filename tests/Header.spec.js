// tests/Header.spec.js
import { mount } from '@vue/test-utils';
import Header from '../src/components/Header.vue';

describe('Header.vue', () => {
  it('renders props when passed', () => {
    const wrapper = mount(Header, {
      props: {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        buttonText: 'Click Me',
      },
    });
    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Subtitle');
    expect(wrapper.text()).toContain('Click Me');
  });
});
