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
          <div id="game-over">GAME OVER!</div>

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
          </div>
          
        </div>
      </div>
    )
  }
}

export default GameOverModal;