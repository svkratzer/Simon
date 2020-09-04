import React from "react";

class Button extends React.Component {

  render() {
    return (
      <button id={`${this.props.color}-button`}></button>
    )
  }
}

export default Button;