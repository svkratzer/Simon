import React from 'react';

class GameOverModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleYes = this.handleYes.bind(this);
  }

  handleYes(e) {
    e.preventDefault();
    this.props.closeModal(e);
    this.props.playGame(e);
  }

  render() {

    return (
      <div className="modal screen">
        <div className="modal container">

          <div id="highscores-container">
            <div id="game-over">GAME OVER!</div>
            { this.props.newHighScore && 
              <>
                <div id="new-highscore">
                  You scored {this.props.highScore}! That's a record!
                </div>
                <label>Player Name:&nbsp;
                  <input id="highscore-name"
                    placeholder="Enter your name, here."
                    type="text" 
                    value={this.props.name}
                    onChange={this.props.updateName}/>
                </label>
              </>
            }

            <div id="highscores-header">TOP THREE HIGHSCORES</div>
            <div className="line"></div>
            <ul id="highscores">
              {this.props.highScores.slice(3).reverse()}
            </ul>
          </div>

          <div>
            <div id="play-again">Would you like to play again?</div>
            <div className="buttons">
              <button onClick={this.handleYes}>
                YES
              </button>
              <button onClick={this.props.closeModal}>
                NO
              </button>
            </div>
            <div id="desktop-note">You can also press the 'spacebar' to start again</div>
          </div>

        </div>
      </div>
    )
  }
}

export default GameOverModal;