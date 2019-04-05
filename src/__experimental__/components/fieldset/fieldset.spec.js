import React from 'react';
import { shallow } from 'enzyme';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';
import { LegendStyle } from './fieldset.style';

function render(props, renderType = shallow) {
  return renderType(
    <Fieldset { ...props }>
      <Textbox />
    </Fieldset>
  );
}

describe('Fieldset', () => {
  it('renders its children', () => {
    const wrapper = render();
    expect(wrapper.find(Textbox).length).toEqual(1);
  });

  describe('Fieldset Legend', () => {
    it('is rendered if supplied', () => {
      const wrapper = render({ legend: 'Legend' });
      expect(wrapper.find(LegendStyle).length).toEqual(1);
    });
  });
});
