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
          <div>GAME OVER!</div>
          <div>Would you like to play again?</div>
          <button onClick={this.handleYes}>
            heck yes
          </button>
          <button onClick={this.props.closeModal}>
            naw dood
          </button>
        </div>
      </div>
    )
  }
}

export default GameOverModal;