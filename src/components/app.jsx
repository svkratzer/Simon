import React from 'react';
import { PolySynth } from 'tone';

import Button from './button';
import GameOverModal from './game_over_modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOver: true,
      modal: false,
      playersTurn: true,
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
    this.playNextSequence = this.playNextSequence.bind(this);
    this.sequenceIsCorrect = this.sequenceIsCorrect.bind(this);
    this.sequenceIsComplete = this.sequenceIsComplete.bind(this);
    this.reconcileRound = this.reconcileRound.bind(this);
    this.playGame = this.playGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Add an event listener for a keypress
  componentDidMount() {
    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 32) {
        this.closeModal(e);
        this.playGame(e);
      }
    });
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
    setTimeout(() => { this.deactivateButton(color) }, (this._delay * (3/5)));
  }

  // Increases the sequences length, and plays through the sequence
  playNextSequence() {
    // Set the player's turn to false, because the sequence is playing
    this.setState({ playersTurn: false })
    // Set the player's turn to true after the sequence is done playing
    setTimeout(() => { 
      this.setState({ playersTurn: true }); 
      }, (this._delay * this.correctSequence.length - 1));
    // Add the next color
    this.pushNewColor();
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
    const { correctSequence } = this.state
    const inputSequence = this.inputSequence
    let correct = true;
    // Iterate over the input sequence to see if it's correct every step of the way
    for(let i = 0; i < inputSequence.length; i++) {
      if (inputSequence[i] !== correctSequence[i]) correct = false;
      if (i === inputSequence.length - 1) return correct;
    }
  }

  // Check to see if the sequence is complete
  sequenceIsComplete() {
    const { correctSequence } = this.state
    return this.inputSequence.length === correctSequence.length
  }

  // Handles logic when the game has ended
  gameOverProtocol() {
    this.currentScore = 0;
    this.round = 0;
    this.inputSequence = [];
    this.correctSequence = [];
    // Reset all the necessary parts of state
    this.setState({ 
      gameOver: true,
      modal: true,
      currentScore: this.currentScore,
      round: this.round,
      inputSequence: [],
      correctSequence: []
    });
  }

  // Handles game over and increasing current score logic depending on whether the sequence is correct
  reconcileRound() {
    const sequenceIsCorrect = this.sequenceIsCorrect();
    const sequenceIsComplete = this.sequenceIsComplete();
    // Check to see if the sequences and the game is over
    if (sequenceIsCorrect && sequenceIsComplete) {
      this.currentScore += 1
      this.setState({ currentScore: this.currentScore })
      this.inputSequence = [];
      this.setState({ inputSequence: this.inputSequence })
      // Start the next sequence on a delay...
      setTimeout(this.playNextSequence, 1000);
    // Check to see if the sequences do not match at any given point
    } else if (!sequenceIsCorrect) {
      this.gameOverProtocol();
    }

    // Check to see if there's a new high score
    if (this.currentScore > this.state.highScore) {
      this.setState({ highScore: this.currentScore })
    }
  }

  handleClick(e) {
    e.preventDefault();

    // This particular line of code fixes a strange issue where clicking 'space'
    // when playing on a computer triggered a mouse click event. It is a temp fix, and doesn't
    // quite get to the root of the isse, but for all intents and purposes, it fixes the bug. 
    if (e.nativeEvent.pageX === 0) return;

    const color = e.target.id
    // Plays the corresponding sound, flashes the button, and pushes color into user input sequence
    this.playNextButton(color);
    this.inputSequence.push(color);
    // Updates state to user input sequence if it's the player's turn
    if (this.state.playersTurn) this.setState({ inputSequence: this.inputSequence });
    // Reconcile the round
    this.reconcileRound();
  }

  // Starts the game logic
  playGame(e) {
    e.preventDefault();
    // Returns if game is already in session
    if (!this.state.gameOver) return;

    // Removes the spacebar start event listener
    window.removeEventListener('keypress', (e) => {
      if (e.keyCode === 32) {
        this.playGame(e);
        this.closeModal(e);
      }
    });

    this.setState({ gameOver: false })
    setTimeout(this.playNextSequence, 250);
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({ modal: false })
  }

  render() {
    const disabled = !this.state.playersTurn;
    const { gameOver, round, modal } = this.state;

    // Display round number if game is playing, otherwise start button
    const roundNumberOrStartButton = gameOver ? (
      <div className="round-or-play-container">
        <div>Press the space bar or click 'Play' to begin</div>
        <button onClick={this.playGame}>
          PLAY
        </button>
      </div>
    ) : (
      <div className="round-or-play-container">
        <div>Current Round: {round === 0 ? 1 : round}</div>
      </div>
    );

    // Create an array of Button components by mapping over this.colors
    const buttons = this.colors.map((color, idx) => (
      <Button onClick={this.handleClick} 
        key={idx} 
        color={color}
        disabled={disabled}/>
    ));
    return (
      <>
        { modal && 
          <GameOverModal 
            closeModal={this.closeModal}
            playGame={this.playGame}/>
        }

        <header>
          <h1>Simon Says</h1>
        </header>

        <section>
          <div id="buttons-container">
            {buttons}
          </div>
        </section>

        <section>
          <div className="round-or-play-container">
            {roundNumberOrStartButton}
          </div>

          <div className="stats">
            <div>
              High Score: {this.state.highScore}
            </div>
          </div>
        </section>

        <section>
          <div id="mobile-note">
            Make sure your phone isn't on 'silent mode', or the sounds won't play!
          </div>
        </section>
      </>
    );
  }
}

export default App;