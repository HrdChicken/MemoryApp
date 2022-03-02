import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import './PostCard.css'

function PostCard({post, isProfile, user, addLike, removeLike}) {
  const likedIndex = post.likes.findIndex(like => like.username === user.username)
  const likeColor = likedIndex > -1 ? 'grey' : 'white';
  const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)

  return (
	<Card key={post._id} raised>
	{isProfile ? (
	  ""
	) : (
	  <Card.Content style={{backgroundColor: 'black'}}>
		<Card.Content>
		  <Link className='PostProfileLink' to={`/${post.user.username}`}>
			@{post.user.username}
		  </Link>
		</Card.Content>
	  </Card.Content>
	)}
	<Image src={`${post.photoUrl}`} wrapped ui={false} />
	<Card.Content style={{backgroundColor: 'black'}}>
	  <Card.Description style={{color: 'white'}}>{post.caption}</Card.Description>
	</Card.Content>
	<Card.Content extra textAlign={"left"} style={{backgroundColor: 'black', color: 'white'}} >
	  <Icon name={"thumbs up"} size="large" color={likeColor} onClick={clickHandler}/>
	  {post.likes.length} Likes
	</Card.Content>
  </Card>
  )
}

export default PostCard;