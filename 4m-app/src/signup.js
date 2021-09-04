import React, { Component } from 'react';

class Signup extends Component {

  state = {
    error: '',
    respStatus: null
  }

  // componentDidMount() {
  // }

  signUpForUser = (signUpObject) => {
    // let signUpObj = new FormData();
    // signUpObj.append("email", newEmail);
    // signUpObj.append("password", newPassword);
    fetch("http://localhost:5000/login/signup", {
      method: 'POST',
      body: JSON.stringify(signUpObject),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          respStatus: data.email
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message
        });
      });
  }

  onSignUp = (event) => {
    event.preventDefault();
    const userNewEmail = event.target[0].value;
    const userNewPassword = event.target[1].value;
    console.log(userNewEmail);
    console.log(userNewPassword);
    const userSignUpObj = {
      email: userNewEmail,
      password: userNewPassword
    }
    this.signUpForUser(userSignUpObj);
  }

  render() {
    const { error, respStatus } = this.state;

    return (
      <div id="signup-container">
        <h1>Sign up with 4M!</h1>

        <form onSubmit={this.onSignUp}>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {error && <p>{error}</p>}
        {respStatus && <p>{`An account under ${respStatus} has been created.`}</p>}
      </div>
    );
  }
}

export default Signup;
