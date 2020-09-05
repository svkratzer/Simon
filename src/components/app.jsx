import React from 'react';
import Button from './button';
import { PolySynth } from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.colors = ["green", "red", "yellow", "blue"]

    // Creates a synth and connect it to the main output (users speakers)
    this.synth = new PolySynth().toDestination();

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  // Plays a different note, depending on the color passed in
  playSound(color) {
    const notes = {
      green: "C4",
      red: "E4",
      yellow: "G4",
      blue: "A4"
    }

    this.synth.triggerAttackRelease(notes[color], "8n");
  }

  handleClick(e) {
    e.preventDefault();
    this.playSound(e.target.id);
  }

  render() {
    
    // Create an array of Button components by mapping over this.colors
    const buttons = this.colors.map((color, idx) => (
      <Button onClick={this.handleClick} key={idx} color={color}/>
    ));

    return (
      <>
        <header>
          <h1>Simon Says</h1>
        </header>

        <section>
          <div id="buttons-container">
            {buttons}
          </div>
        </section>
      </>
    );
  }
}

export default App;