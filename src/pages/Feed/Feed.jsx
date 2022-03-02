import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import { Grid, Segment } from "semantic-ui-react";
import './Feed.css'

export default function Feed({ user, handleSignUpOrLogin }) {
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      getPosts();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getPosts();
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      setPosts([...data.posts]);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
        </Grid.Column>
      </Grid.Row>
      <h1>Shared Memories</h1>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 850 }}>
          <PostFeed
            posts={posts}
            numPhotosCol={3}
            isProfile={false}
            user={user}
            addLike={addLike}
            loading={loading}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
