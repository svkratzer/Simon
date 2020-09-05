import React from 'react';
import Button from './button';
import { PolySynth } from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOver: false,
      playersTurn: false,
      correctSequence: [],
      inputSequence: [],
      round: 0,
      currentScore: 0,
      highScore: 0
    }

    this.correctSequence = [];
    this.inputSequence = [];
    this.round = 0;
    this.currentScore = 0;
    this.highScore = 0;

    this._delay = 500
    this.colors = ["green", "red", "yellow", "blue"];

    // Creates a synth and connects it to the main output (users speakers)
    this.synth = new PolySynth().toDestination();

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
    this.pushNewColor = this.pushNewColor.bind(this);
    this.reconcileRound = this.reconcileRound.bind(this);
  }

  // Plays a different note, depending on the color passed in
  playSound(color) {
    const notes = {
      green: "C4",
      red: "E4",
      yellow: "G4",
      blue: "C5"
    }
    this.synth.triggerAttackRelease(notes[color], "8n");
  }

  activateButton(color) {
    const button = document.getElementById(color)
    button.classList.add("activated")
  }

  deactivateButton(color) {
    const button = document.getElementById(color)
    button.classList.remove("activated")
  }

  
  // Adds a new color to the sequence
  pushNewColor() {
    const idx = Math.floor(Math.random() * this.colors.length);
    this.correctSequence.push(this.colors[idx])
  }
  
  // "Plays" a button in the sequence by making it blink and play its note
  playNextButton(color) {
    this.activateButton(color);
    this.playSound(color);
    setTimeout(() => { this.deactivateButton(color) }, (this._delay * (3/5)))
  }

  // Increases the sequences length, and plays through the sequence
  playNextSequence() {
    // Add the next color
    this.pushNewColor()
    this.setState({ correctSequence: this.correctSequence });
    // Play the sequence with sounds
    this.correctSequence.forEach((color, i) => {
      setTimeout(() => { this.playNextButton(color) }, this._delay * i);
    });
    // Increment the round by one
    this.round += 1
    this.setState({ round: this.round })
  }

  // Check to see if the sequences match
  sequenceIsCorrect() {
    this.state.inputSequence.forEach((color, i) => {
      if (color !== this.state.correctSequence[i]) return false;
    });
    return true;
  }

  // Handles game over and increasing current score logic depending on whether the sequence is correct
  reconcileRound() {
    if (this.sequenceIsCorrect) {

    } else {
      this.setState({ gameOver: true })
    }
  }

  handleClick(e) {
    e.preventDefault();
    const color = e.target.id
    // Plays the corresponding sound and pushes color into user input sequence
    this.playSound(color);
    this.inputSequence.push(color)
    // Updates state to user input sequence if it's the player's turn
    if (this.state.playersTurn) this.setState({ inputSequence: this.inputSequence });
    // Check to see if the player is done entering the sequence
    if (this.state.inputSequence.length === this.state.correctSequence.length) {
      this.reconcileRound();
    }
    console.log(this.state.inputSequence)
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

        <section>
          <button onClick={(e) => {e.preventDefault(); this.playNextSequence();}}>
            LET'S PLAY
          </button>
          <div className="stats">
            <div>
              Current Round: {this.state.round}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;