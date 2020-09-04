import React from "react";

class Button extends React.Component {

  render() {
    return (
      <button>
        {this.props.color}
      </button>
    )
  }
}

export default Button;