import React from "react";

class Button extends React.Component {

  render() {
    return (
      <button class="button"
        id={`${this.props.color}`}>
      </button>
    )
  }
}

export default Button;