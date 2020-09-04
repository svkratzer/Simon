import React from "react";

class Button extends React.Component {

  render() {
    return (
      <button className="button"
        id={`${this.props.color}`}>
      </button>
    )
  }
}

export default Button;