import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.chatManager({
      instanceLocator: 'v1:us1:566b995c-0276-46fe-8b2f-1e69e0893135',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:8000/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
      </div>
    );
  }
}

export default ChatScreen;