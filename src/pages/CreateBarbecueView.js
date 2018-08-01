import React from 'react';
import { observer } from 'mobx-react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core';

import { IfIsLoged } from 'components';
import { UserViewModel } from 'viewModels';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

@observer
class CreateBarbecueViewComponent extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, model } = this.props;
    const barbecue = model.getBarbecue();
    return (
      <IfIsLoged
        t={() => {
          return (
            <form className={classes.container} noValidate autoComplete='off'>
              <Grid container justify='center'>
                <TextField
                  id='model'
                  label='Modelo'
                  className={classes.textField}
                  value={barbecue.model}
                  onChange={model.handleChange('model')}
                  margin='normal'
                />
              </Grid>
              <Grid container justify='center'>
                <TextField
                  id='description'
                  label='Descripción'
                  className={classes.textField}
                  value={barbecue.description}
                  onChange={model.handleChange('description')}
                  type='text'
                  margin='normal'
                />
              </Grid>
              <Grid
                container
                justify='center'
                style={{
                  marginTop: 50
                }}
              >
                <Button onClick={() => model.add(barbecue)}>Crear</Button>
              </Grid>
            </form>
          );
        }}
        onWillMount={() => {
          UserViewModel.toggleLoginDialog();
        }}
      />
    );
  }
}

CreateBarbecueViewComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CreateBarbecueView = withStyles(styles)(CreateBarbecueViewComponent);
export {
  CreateBarbecueView
};
