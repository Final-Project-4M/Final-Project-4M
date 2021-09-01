import React, { Component } from 'react';

import './Threads.css'

// should render all the threads and let them be clickable

class Threads extends Component {

  state = {
    returnedThreads: [],
    error: ''
  }

  componentDidMount() {
    // http://localhost:5000
    // https://floating-reef-51161.herokuapp.com
    fetch("http://localhost:5000/thread", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          returnedThreads: data
        });
      }).catch((error) => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const { returnedThreads, error } = this.state;

    return (
      <div className="all-threads">
        <h1>Threads</h1>
        {error && <p>{error}</p>}

        {returnedThreads.map((thread, idx) => {
          return (
            <div className="oneThread" key={idx}>
              <h2>{thread.title}</h2>
            </div>
          );
        })}

      </div>
    );
  }
}

export default Threads;
