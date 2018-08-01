import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {
  AppBar,
  Tabs,
  Tab,
  Button,
  Grid,
} from '@material-ui/core';
import Navigation from 'Navigation';
import { NavigationStorage } from 'config/NavigationStorage';
import { UserViewModel } from 'viewModels';
import {
  IfIsLoged,
  LoginDialog
} from 'components';
@observer
class App extends Component {
  componentWillMount() {
    const navModel = new NavigationStorage();
    navModel.load();
  }
  render() {
    const userModel = UserViewModel.getInstance();
    return (
      <div>
        <AppBar position='static'>
          <Tabs
            value={NavigationStorage.current_page}
            onChange={(event, page) => NavigationStorage.go(page)}
            centered
          >
            <Tab label='Buscar barbacoas' />
            <Tab label='Crear barbacoa' />
            <Tab label='Mis barbacoas' />
            <IfIsLoged
              t={
                () => (
                  <Button
                    color='secondary'
                    variant='flat'
                    aria-label='Add'
                    className='white'
                    onClick={() => userModel.logout()}
                  >
                    Cerrar sesión
                  </Button>
                )
              }
              f={
                () => (
                  <Button
                    color='secondary'
                    variant='flat'
                    aria-label='Add'
                    className='white'
                    onClick={() => UserViewModel.toggleLoginDialog()}
                  >
                    Iniciar / Registrarse
                  </Button>
                )
              }
            />
          </Tabs>
        </AppBar>
        <LoginDialog
          userModel={userModel}
        />
        <Grid container justify='center'>
          <Navigation />
        </Grid>
      </div>
    );
  }
}

export default App;
