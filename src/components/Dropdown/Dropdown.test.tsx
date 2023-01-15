import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  test('it should mount', () => {
    render(<Dropdown title="Type" options={[{name: 'name', value: 'value'}]} id="dropdown"/>);

    const dropdown = screen.getByTestId('Dropdown');

    expect(dropdown).toBeInTheDocument();
  });
});
