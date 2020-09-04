import React from 'react'
import Button from './button'

class App extends React.Component {

  render() {
    return (
      <div>
        <div id="buttons-container">
          <Button color="Red" />
          <Button color="Green" />
          <Button color="Blue" />
          <Button color="Yellow" />
        </div>
      </div>
    );
  }
}

export default App;