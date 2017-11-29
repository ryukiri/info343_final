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
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Michelle Chen"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            Michelle Chen
          </Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo ligula at felis pellentesque euismod. 
            Duis fringilla ipsum dolor, sit amet consequat ex placerat a. Sed ultricies sem sit amet lobortis dignissim.
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