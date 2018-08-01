import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import { IfIsLoged } from 'components';
import { UserViewModel } from 'viewModels';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

@observer
class BarbecuesViewComponent extends Component {
  componentWillMount() {
    const { model } = this.props;
    model.load(true);
  }
  renderList() {
    const { classes, model, myList } = this.props;
    const mapFunc = b => (
      <ListItem key={b.id} dense button className={classes.listItem}>
        <ListItemText primary={`Modelo: ${b.model}`} />
        <ListItemText primary={`Contacto: ${b.owner.email}`} />
        {(() => {
          if (!myList) {
            return (
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={() => model.select(b.id)}
                  checked={model.barbecues_selected.indexOf(b.id) !== -1}
                />
              </ListItemSecondaryAction>
            )
          }
        })()}
      </ListItem>
    );
    return myList ? model.myBarbecues.map(mapFunc) : model.barbecues.map(mapFunc);
  }

  render() {
    const { classes, myList } = this.props;
    const content = () => {
      return (
        <div className={classes.root}>
          <List>
            {this.renderList()}
          </List>
        </div>
      );
    };
    if (myList) {
      return (
        <IfIsLoged
          t={content}
          onWillMount={() => {
            UserViewModel.toggleLoginDialog();
          }}
        />
      );
    }
    return content();
  }
}

const BarbecuesView = withStyles(styles)(BarbecuesViewComponent);
export { BarbecuesView };
