import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {
  Paper
} from '@material-ui/core';
import {
} from '@material-ui/icons';
import {
  BarbecuesView,
  CreateBarbecueView,
} from 'pages';
import {
  BarbecueViewModel
} from 'viewModels';
import { NavigationStorage } from 'config/NavigationStorage';
const { pages } = require('config/GLOBAL');
@observer
class Navigation extends Component {

  renderPage(current_page) {
    const model = BarbecueViewModel.getInstance();
    switch (current_page) {
      case pages.list:
        return <BarbecuesView model={model} />;
      case pages.create:
        return <CreateBarbecueView model={model} />;
      case pages.myList:
        return <BarbecuesView model={model} myList={true}/>;
      default:
    }
  }

  render() {
    return (
      <Paper
        style={{
          marginTop: '80px',
          width: '80%',
          padding: '20px'
        }}
        elevation={1}
      >
        {this.renderPage(NavigationStorage.current_page)}
      </Paper>
    );
  }
}

export default Navigation;
