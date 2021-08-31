import React, { Component } from 'react';

// should render all the threads and let them be clickable

class Threads extends Component {
  state = {
    isLoading: false,
    returnedThreads: [],
    error: ''
  }

  componentDidMount() {
    // https://floating-reef-51161.herokuapp.com
    fetch("http://localhost:5000/thread")
      .then(response => response.json())
      .then(data => {
        console.log("hello")
        this.setState({
          isLoading: false,
          returnedThreads: data
        });
      }).catch((error) => {
        this.setState({
          isLoading: false,
          error: error.message
        });
      });
  }

  render() {
    const { isLoading, returnedThreads, error } = this.state;

    return (
      <div className="all-threads">
        <h2>Threads</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div>
          {returnedThreads}
        </div>
      </div>
    );
  }

}

export default Threads;
