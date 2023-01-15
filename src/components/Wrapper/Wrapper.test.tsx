import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Wrapper from './Wrapper';

describe('<Wrapper />', () => {
  test('it should mount', () => {
    render(<Wrapper><div></div></Wrapper>);

    const wrapper = screen.getByTestId('Wrapper');

    expect(wrapper).toBeInTheDocument();
  });
});
