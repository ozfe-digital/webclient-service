import React, { Component } from 'react';
import SystemUser from "../../helper/user";
import AppTemplate from '../../Templates/AppTemplate/AppTemplate';

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { }; 
  }
  
  componentDidMount() {
    this.getUserDetails();
  }
  
  getUserDetails () {
    // console.log(SystemUser.get())
    if (SystemUser.get() != null) {
      this.setState({
        id: SystemUser.get().id,
        name: SystemUser.get().name,
        email: SystemUser.get().email,
        role: SystemUser.get().role
      });
    }
  };
  
  render() {
    const { name } = this.state;
    return (
      <AppTemplate>
        <div className="HomePage">
            <h1> Home page  </h1>
        </div>
      </AppTemplate>
    )
  }
}