import React from 'react'
import Button from './button'

class App extends React.Component {

  render() {
    return (
      <>
        <header>
          <h1>Simon Says</h1>
        </header>

        <section>
          <div id="buttons-container">
            <Button color="green" />
            <Button color="red" />
            <Button color="yellow" />
            <Button color="blue" />
          </div>
        </section>
      </>
    );
  }
}

export default App;