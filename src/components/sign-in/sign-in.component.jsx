import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../../components/form-input/form-input.component";
import CustomeButton from "../custom-button/custom-button.component";

import { signinWithGG } from "../../firebase/firebase.utils";
import { auth } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = async(event) => {
    event.preventDefault();
    const {email, password} = this.state;

    try{

      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email:'', password: ''})
    }
    catch(err){ console.log(err)}

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I have account</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            handleChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            label="email"
            required
          />

          <FormInput
            handleChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            label="password"
            required
          />
          <div className="buttons">
            <CustomeButton type="submit">SIGN IN</CustomeButton>
            <CustomeButton isGoogleSignIn onClick={signinWithGG}>
              GOOGLE SIGNIN
            </CustomeButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
