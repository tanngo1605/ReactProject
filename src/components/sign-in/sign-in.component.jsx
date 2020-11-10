import React from "react";
import { connect } from "react-redux";

import "./sign-in.styles.scss";
import FormInput from "../../components/form-input/form-input.component";
import CustomeButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const {emailSignInStart} = this.props;

    emailSignInStart(email, password)
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);

    this.setState({ [name]: value });
  };
  render() {
    const { googleSignInStart } = this.props;
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
            <CustomeButton
              type="button"
              isGoogleSignIn
              onClick={googleSignInStart}
            >
              GOOGLE SIGNIN
            </CustomeButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
