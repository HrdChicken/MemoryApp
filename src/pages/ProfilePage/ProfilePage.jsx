import { useState, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import AddPost from "../../components/AddPost/AddPost";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";

export default function ProfilePage(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { username } = useParams();


  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postsAPI.create(post);
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }


  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      setLoading(() => false);
      setPosts(() => data.posts);
      setUser(() => data.user);
    } catch (err) {
      setLoading(() => false);
      setError("Profile Does not exist!");
    }
  }

  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      getProfile();
    } catch (err) {
      setError(err.message)
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getProfile();
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Header />
        <ErrorMessage error={error} />;
      </>
    );
  }
    return (
      <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
      <ProfileBio user={user}/>
      <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 1000 }}>
          <PostFeed
            isProfile={true}
            posts={posts}
            numPhotosCol={5}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
            />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}