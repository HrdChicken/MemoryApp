import React from "react";
import { Image, Grid, Segment } from "semantic-ui-react";
import './ProfileBio.css'

function ProfileBio({ user }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
          <Image
            src={`${
              user?.photoUrl
                ? user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            } `}
            avatar
            size="small"
          />
        <Grid.Column textAlign="left" verticalAlign="middle" style={{ maxWidth: 550 }}>
          <Segment style={{backgroundColor: 'black'}}>
            <h3 className="profileUsername">{user.username}</h3>
            <span className="profileBio">{user.bio}</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfileBio;