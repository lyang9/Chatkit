import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username
        })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    return (
      <div className="App">
        <UsernameForm onSubmit={this.onUsernameSubmitted} />
      </div>
    );
  }
}

export default App;
