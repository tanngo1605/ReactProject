import React from "react";
import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfile } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = async (event) =>{
      event.preventDefault();
      const { displayName, email, password, confirmPassword } = this.state;

      if(password!=confirmPassword){

        alert('Pass not match');
        return;
      }
      try{
        const {user} = await auth.createUserWithEmailAndPassword(email, password);

        await createUserProfile(user, {displayName});

        this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",

        });


      }
      catch(err){
          console.log(err);
      }


  }

  handleChange = e =>{
      const {name, value} = e.target;
      this.setState({[name]: value});

  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span> Sign Up here</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="email"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="password"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          ></FormInput>
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
