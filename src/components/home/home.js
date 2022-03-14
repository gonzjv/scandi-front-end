import React from 'react';
import './home.css';

class Home extends React.Component {
  render() {
    return (
      <main className="home">
        <p>Hello from peaceful 🕊️ Belarus! 🌍🌱🥔</p>
        <div>
          <p> BE is running here: </p>
          <a href={process.env.REACT_APP_API_URL}>
            {process.env.REACT_APP_API_URL}
          </a>
        </div>
      </main>
    );
  }
}

export default Home;
