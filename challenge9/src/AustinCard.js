// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://goo.gl/etfRax"
          title="Austin Quach"
        />
        <CardContent>
          <Typography type="headline" component="h2">
              Austin Quach
          </Typography>
          <Typography component="p">
            Austin is a junior at the University of Washington pursuing a degree in tech. 
            He is also a 3rd year member of the Husky Marching Band. Been playing music since
            first grade, he is quite experienced in piano, viola, violin, flute, and piccolo. Some hobbies include
            basketball, jogging, baking, and photography. 
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);