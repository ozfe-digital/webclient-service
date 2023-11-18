import React, { Component } from "react";
import {
  Card, CardActions, CardContent,Container

} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SystemUser from "../helper/user";
import AppTemplate from "../Templates/AppTemplate/AppTemplate";


export default class OrderView extends Component {
  constructor(props) {

    super(props);
    this.state = {
      role: null,
    };

  }
  componentDidMount() {
    this.getUserDetails();

  }

  getUserDetails() {
    console.log(SystemUser.get())
    if (SystemUser.get() != null) {
      this.setState({
        id: SystemUser.get().id,
        name: SystemUser.get().name,
        email: SystemUser.get().email,
        username: SystemUser.get().username,
        role: SystemUser.get().role

      });

    }

  };

  render() {
    const { name, email, username, role} = this.state;
    return (
      <AppTemplate >
        <Container maxWidth="sm" style={{float:"left"}}>
          <Card variant="outlined">
            <CardContent>
              <List >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary="Full Name" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} secondary="Email Address" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PermIdentityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={username} secondary="User Name" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PermIdentityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.state.role} secondary="Role" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </Container>
       
      </AppTemplate>
    )
  }
}
