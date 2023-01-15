import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Textarea from './Textarea';

describe('<Textarea />', () => {
  test('it should mount', () => {
    render(<Textarea title="Note Code" id="textarea" />);

    const textarea = screen.getByTestId('Textarea');

    expect(textarea).toBeInTheDocument();
  });
});
