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
          image="ali.jpg"
          title="Ali Rafiq"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            Ali Rafiq
          </Typography>
          <Typography component="p">
            Ali Rafiq is a junior at the University of Washington. He is an Informatics major trying to do software development.
            Ali enjoys long hikes, playing video games and working out with his friends. He also has 9 chickens, 2 ducks, 2 bunnies and cat 
            at his house. He loves cookies and milkshakes. He also loves the chicken noodle. 
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