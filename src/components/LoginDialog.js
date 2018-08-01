import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {
  Button,
  DialogTitle,
  Dialog,
  TextField,
  DialogContent,
  DialogActions
} from '@material-ui/core';

import { UserViewModel } from 'viewModels';

import { NavigationStorage } from 'config/NavigationStorage';

const GLOBAL = require('config/GLOBAL');

@observer
class LoginDialog extends Component {

  render() {
    const { userModel } = this.props;
    const classes = {};
    return (
      <Dialog
        onClose={userModel.onCloseLoginDialog}
        aria-labelledby='simple-dialog-title'
        open={UserViewModel.openLoginDialog}
      >
        <DialogTitle id='simple-dialog-title'>Iniciar sesión</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete='off'>
            <TextField
              type='email'
              required
              id='email'
              label='Email'
              className={classes.textField}
              value={userModel.user_credentials.email}
              onChange={userModel.handleChangeCredentials('email')}
              margin='normal'
            />
            <TextField
              required
              id='password-input'
              label='Password'
              className={classes.textField}
              value={userModel.user_credentials.password}
              type='password'
              autoComplete='current-password'
              margin='normal'
              onChange={userModel.handleChangeCredentials('password')}
            />
            {(
              () => {
                if (userModel.registerMode) {
                  return (
                    <TextField
                      required
                      id='zip-code-input'
                      label='Zip code'
                      className={classes.textField}
                      value={userModel.user_credentials.zip_code}
                      autoComplete='current-zip_code'
                      margin='normal'
                      onChange={userModel.handleChangeCredentials('zip_code')}
                    />
                  );
                }
              }
            )()}
          </form>
          <DialogActions>
            <Button
              color='secondary'
              onClick={() => {
                UserViewModel.toggleLoginDialog();
                NavigationStorage.go(GLOBAL.pages.list)
              }}
            >
              Salir
            </Button>
            <Button
              color='primary'
              onClick={() => userModel.login()}
            >
              Iniciar sesión
            </Button>
            <Button
              color='primary'
              onClick={() => userModel.register()}
            >
              Registrarse
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export {
  LoginDialog
};
