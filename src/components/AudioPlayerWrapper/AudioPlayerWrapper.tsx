import React, { FC } from 'react';
import AudioPlayerForm from '../AudioPlayerForm/AudioPlayerForm';
import Wrapper from '../Wrapper/Wrapper';

interface AudioPlayerWrapperProps {}

const AudioPlayerWrapper: FC<AudioPlayerWrapperProps> = () => (
  <div data-test-id="AudioPlayerWrapper">
      <Wrapper wrapperClass="p-2 border rounded-3 row">
          <div className="col-12">
              <h2>Welcome to <strong>Audio Player</strong>!</h2>
              <p>
                  Please insert note code in the next format: <code>E4/4 A#4/16 D#4/8.</code>, <br/>
                  where <code>E4</code> is a note in
                  <a href="https://en.wikipedia.org/wiki/Scientific_pitch_notation" target="_blank" rel="noreferrer">
                      Scientific pitch notation
                  </a>,
                  <code>4</code> stands for <code>1/4</code> note length,
                  and there is a space between notes.
              </p>
              <p>
                  <strong><i>Star Wars - The Imperial March, 100 tempo</i>:</strong><br/>
                  <code>
                      E4/4 E4/4 E4/4 D#4/8. A#4/16 E4/4 D#4/8. A#4/16 E4/2
                      D5/4 D5/4 D5/4 D#5/8. A#4/16 F#4/4 D#4/8. A#4/16 E4/2
                  </code>
              </p>
              <p>
                  <strong><i>Song about Father, 60 tempo:</i></strong><br/>
                  <code>
                      D3/8 D3/8 A#3/8. A3/16 G3/8 G3/4.
                      A#3/8 A#3/8 C4/8 A#3/8 A3/4. A3/8
                      A3/8 A3/8 A3/8 A3/8 D4/8 C4/8 A#3/8 A3/8
                      A#3/4 A#3/8. A#3/16 D4/8 A#3/8
                  </code>
              </p>
          </div>

          <AudioPlayerForm />
      </Wrapper>
  </div>
);

export default AudioPlayerWrapper;
