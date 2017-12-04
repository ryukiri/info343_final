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
          image="michelle.jpg"
          title="Michelle Chen"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            Michelle Chen
          </Typography>
          <Typography component="p">
            Michelle is a senior studying at the University of Washington pursuing a double degree in Informatics and Business. This quarter she is studying client-side web development in Jason Nutter's INFO 343 class. Outside of academics Michelle enjoys going on runs, spending time with family and friends, and traveling. 
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