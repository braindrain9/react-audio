import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AudioPlayerWrapper from './AudioPlayerWrapper';

describe('<AudioPlayerWrapper />', () => {
  test('it should mount', () => {
    render(<AudioPlayerWrapper />);

    const audioPlayer = screen.getByTestId('AudioPlayerWrapper');

    expect(audioPlayer).toBeInTheDocument();
  });
});
