import './App.scss';
import React from 'react';

const CardList = (props) => (
  <div style={{
    width: 400,
    margin: '0 auto'
  }}>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile" style={{
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '1rem',
        textAlign: 'left'
      }}>
        <img src={profile.avatar_url} alt="" style={{ width: 75, height: 75 }} />
        <div className="info" style={{ display: 'inline-block', marginLeft: 10 }}>
          <div className="name" style={{ fontSize: '125%' }}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    )
  }
}

class Form extends React.Component {
  state = {
    userName: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`https://api.github.com/users/${this.state.userName}`).then(resp => resp.json());
    this.props.onSubmit(data);
    this.setState({ userName: '' });
  }

  handleState = (e, prop) => this.setState({ [prop]: e.target.value })

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="GitHub username"
          required
          value={this.state.userName}
          onChange={(e) => this.handleState(e, 'userName')}
        />
        <button type="submit">Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.props.title}</h1>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    )
  }
}

export default App;
