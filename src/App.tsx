import React from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import AudioPlayerWrapper from './components/AudioPlayerWrapper/AudioPlayerWrapper';
import Wrapper from './components/Wrapper/Wrapper';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Wrapper wrapperClass="mx-auto col-lg-8">
                    <Logo />
                    <AudioPlayerWrapper />
                </Wrapper>
            </div>
          );
    }
}

export default App;
