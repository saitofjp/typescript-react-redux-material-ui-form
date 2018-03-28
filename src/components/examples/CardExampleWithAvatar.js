import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { NavLink  } from 'react-router-dom';

const CardExampleWithAvatar = (props) => (
  <Card>
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="images/jsa-128.jpg"
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="images/nature-600-337.jpg" alt="" />
    </CardMedia>
    <CardTitle title={props.title} subtitle="Card subtitle" />
    <CardText>{props.body}</CardText>
    <CardActions>
       <NavLink to="/about"><FlatButton label="About"  /></NavLink>
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);
export default CardExampleWithAvatar;