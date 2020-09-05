import React from "react";

class Button extends React.Component {

  render() {
    return (
      <button className="button"
        onClick={this.props.onClick}
        id={`${this.props.color}`}>
      </button>
    )
  }
}

export default Button;