import React from 'react'
import Button from './button'

class App extends React.Component {

  render() {
    return (
      <div id="buttons-container">
        <Button color="green" />
        <Button color="red" />
        <Button color="yellow" />
        <Button color="blue" />
      </div>
    );
  }
}

export default App;