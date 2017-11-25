/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import SimpleMediaCard from './SimpleMediaCard';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Meet the Team</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={Transition}
        >
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                Our Team
                </Typography>
            </Toolbar>
        </AppBar>
        
        <div className="container row">
            <div className="col-md-4">
                <SimpleMediaCard/>
            </div>

            <div className="col-md-4">
                <SimpleMediaCard/>
            </div>

            <div className="col-md-4">
                <SimpleMediaCard/>
            </div>
        </div>
        
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);