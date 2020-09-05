import React from 'react';

class GameOverModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal screen">
        <div className="modal container">
          <div>GAME OVER!</div>
          <div>Would you like to play again?</div>
          <button>heck yes</button>
          <button>naw dood</button>
        </div>
      </div>
    )
  }
}

export default GameOverModal;