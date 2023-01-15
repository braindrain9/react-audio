import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AudioPlayerForm from './AudioPlayerForm';

describe('<AudioPlayerForm />', () => {
  test('it should mount', () => {
    render(<AudioPlayerForm />);

    const form = screen.getByTestId('AudioPlayerForm');

    expect(form).toBeInTheDocument();
  });
});
