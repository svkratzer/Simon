import React from 'react'
import Button from './button'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.colors = ["green", "red", "yellow", "blue"]
  }

  render() {
    
    // Create an array of Button components by mapping over colors
    const buttons = this.colors.map((color, idx) => (
      <Button key={idx} color={color}/>
    ));

    return (
      <>
        <header>
          <h1>Simon Says</h1>
        </header>

        <section>
          <div id="buttons-container">
            {buttons}
          </div>
        </section>
      </>
    );
  }
}

export default App;