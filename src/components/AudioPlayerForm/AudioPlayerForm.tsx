import React from 'react';
import Button from '../Button/Button';
import Textarea from '../Textarea/Textarea';
import Dropdown, {TDropdownOption} from '../Dropdown/Dropdown';
import Wrapper from '../Wrapper/Wrapper';
import {NOTES_MAP} from '../../constants';

type TNote = {frequency : number, duration : number};

const typeDropdownOptions : TDropdownOption[] = [
    {name: 'Sine', value: 'sine'},
    {name: 'Square', value: 'square'},
    {name: 'Triangle', value: 'triangle'},
    {name: 'Sawtooth', value: 'sawtooth'},
];

const tempoDropdownOptions : TDropdownOption[] = [
    {name: '100', value: 100},
    {name: '60', value: 60},
    {name: '80', value: 80},
    {name: '120', value: 120},
];

function createAudioContext() {
    return new (window.AudioContext)(); // window.webkitAudioContext
}


function noteDurationToMs (tempo : number, duration : number) : number {
  return 60 * 4 * round(duration) / tempo;
}

function round(value : number) : number {
  return Math.round((value) * 100) / 100;
}

// start
class AudioPlayerForm extends React.Component {
    playButton : any;
    stopButton : any;
    textarea : any;
    textarea2 : any;
    tempoInput : any;
    osctypeInput : any;
    isPaused;
    has2Outputs;
    oscillator : any;
    gainNode : any;
    time : any;
    counter : number;
    audioContext : any;

    constructor(props : any) {
        super(props);

        this.counter = 0;
        // this.playButton = React.createRef<HTMLButtonElement>();
        // this.stopButton = React.createRef<HTMLButtonElement>();
        // this.textarea = React.createRef<HTMLTextAreaElement>();
        // this.textarea2 = React.createRef<HTMLTextAreaElement>();
        // this.tempoInput = React.createRef<HTMLSelectElement>();
        // this.osctypeInput = React.createRef<HTMLSelectElement>();
        this.audioContext = createAudioContext();

        this.isPaused = false;
        this.has2Outputs = false;
    }

    play = (event : any) : void => {
      event.preventDefault();

      console.log(this, 'this');

      this.stopButton.disabled = false;
      this.textarea.disabled = true;
      this.textarea2.disabled = true;
      this.tempoInput.disabled = true;
      this.osctypeInput.disabled = true;

      if (this.playButton.textContent === 'Play') {
        this.playButton.textContent = 'Pause';

        if (this.audioContext.state === 'closed') {
          this.audioContext = createAudioContext();
        }

        console.log(this.isPaused, 'isPaused');

        this.audioContext.resume().then(() => {
          if (!this.isPaused) {
            this.playFromBeginning();
          }
        });
      } else {
        this.onPause();
      }
    }

    stop = (event : any) : void => {
      event.preventDefault();

      this.has2Outputs = false;
      this.onComplete();
    }

    init = () => {
        this.counter = 0;
        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    };

    soundPlay = (note : TNote, prevDuration : number, notesLength : number) : void => {
        // create and connect oscillator and gain nodes
        this.init();
        this.time = this.audioContext.currentTime;

        // setup sound
        this.oscillator.type = this.osctypeInput.value || 'sine';
        this.oscillator.frequency.value = note.frequency;
        this.gainNode.gain.setValueAtTime(0.3, this.time + prevDuration);

        // play sound
        this.oscillator.start(this.time + prevDuration);
        this.gainNode.gain.exponentialRampToValueAtTime(0.1, this.time + prevDuration + note.duration);
        this.oscillator.stop(this.time + prevDuration + note.duration);

        this.oscillator.onended = () => {
            this.counter += 1;

            console.log(notesLength, this.counter);

            if (notesLength === this.counter) {
                this.onComplete();
            }
        }
    }

    playFromBeginning = () : void => {
      console.log('playFromBeginning');

      const noteCode = this.textarea.value;
      const noteCode2 = this.textarea2.value;

      if (!noteCode && !noteCode2) {
        return;
      }

      this.has2Outputs = Boolean(noteCode && noteCode);

      this.onPlay(noteCode);
      this.onPlay(noteCode2);
    }

    onPlay = (noteCode : string) : void => {
      const notes = this.parseNoteCode(noteCode);

      if (notes.length) {
        // const sound = new Sound();
          notes.reduce((delay, {duration, frequency}) => {
              this.soundPlay({frequency, duration}, delay, notes.length);

              return round(delay + duration);
          }, 0);
      }
    }

    onPause = () : void => {
      this.playButton.textContent = 'Play';
      this.isPaused = true;

      if (this.audioContext?.state !== 'closed') {
        this.audioContext.suspend();
      }
    }

    parseNoteCode = (noteCode : string) : TNote[] => {
      if (!noteCode) {
        return [];
      }

      const tempo = this.tempoInput.value || 100;
      const noteData = noteCode.replace(/\n/g, ' ',).split(' ');
      const notes : TNote[] = [];

      noteData.forEach((item : string) => {
        const itemArr : string[] = item.split('/');
        const frequency = itemArr[0] ? NOTES_MAP[itemArr[0]] : null;
        const isValidNote = frequency && itemArr[1];

        if (isValidNote) {
          let multiplier = 1;

          if (itemArr[1].includes('.')) {
            multiplier = 1.5;
            itemArr[1] = itemArr[1].replace('.', '');
          }

          const duration = multiplier / +itemArr[1];
          const note = {
            frequency,
            duration: noteDurationToMs(tempo, duration),
          };

          notes.push(note);
        }
      });

      return notes;
    }

    onComplete = () : void => {
      if (this.has2Outputs) {
        this.has2Outputs = false;
      } else {
        this.playButton.textContent = 'Play';
        this.isPaused = false;
        this.textarea.disabled = false;
        this.textarea2.disabled = false;
        this.tempoInput.disabled = false;
        this.osctypeInput.disabled = false;

        if (this.audioContext?.state !== 'closed') {
          this.audioContext.close();
        }
      }

    }

    componentDidMount() {
        // this.playButton = React.createRef<HTMLButtonElement>();
        // this.stopButton = React.createRef<HTMLButtonElement>();
        // this.textarea = React.createRef<HTMLTextAreaElement>();
        // this.textarea2 = React.createRef<HTMLTextAreaElement>();
        // this.tempoInput = React.createRef<HTMLSelectElement>();
        // this.osctypeInput = React.createRef<HTMLSelectElement>();

        this.playButton = document.getElementById('play-button');
        this.stopButton = document.getElementById('stop-button');
        this.textarea = document.getElementById('textarea');
        this.textarea2 = document.getElementById('textarea2');
        this.tempoInput = document.getElementById('tempo');
        this.osctypeInput = document.getElementById('osctype');
    }

    render() {
        return (
            <div data-testid="AudioPlayerForm">
                <form className="row">
                    <Wrapper wrapperClass="col-12 mb-1">
                        <Textarea id={'textarea'} title={'Note Code'}></Textarea>
                    </Wrapper>
                    <Wrapper wrapperClass="col-12 mb-1">
                        <Textarea id={'textarea2'} title={'Additional Note Code'}></Textarea>
                    </Wrapper>

                    <Wrapper wrapperClass="col-lg-6 mb-1">
                        <Dropdown id={'osctype'} title="Type" options={typeDropdownOptions}/>
                    </Wrapper>

                    <Wrapper wrapperClass="col-lg-6">
                        <Dropdown id={'tempo'} title="Tempo" options={tempoDropdownOptions}/>
                    </Wrapper>

                    <Wrapper wrapperClass="col-12 mt-3 text-center">
                        <Button id={'play-button'} btnClick={this.play} btnClass={'btn-outline-primary'}>Play</Button>
                        <Button id={'stop-button'} btnClick={this.stop} btnClass={'btn-outline-danger'}>Stop</Button>
                    </Wrapper>
                </form>
            </div>
        );
    }
}

export default AudioPlayerForm;
