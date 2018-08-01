import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { UserViewModel } from 'viewModels';
@observer
class IfIsLoged extends Component {
  componentWillMount() {
    const { onWillMount } = this.props;
    if (onWillMount && UserViewModel.currentUser === null) {
      onWillMount();
    }
  }
  render() {
    const { t, f } = this.props;
    if (UserViewModel.currentUser !== null && t) {
      return (
        <div>
          {t()}
        </div>
      );
    }
    if (f) {
      return (
        <div>
        {f()}
        </div>
      );
    }
    return [];
  }
}

export {
  IfIsLoged
};
