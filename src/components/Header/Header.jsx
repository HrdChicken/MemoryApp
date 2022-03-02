import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, } from "semantic-ui-react";
import './Header.css'

export default function PageHeader({ user, handleLogout }) {
    console.log(user, 'user in header')
  return (
    <Segment clearing style={{backgroundColor: 'gray'}}>
      <Header as="h2">
      <Image src='memorymicro.png' href='/'></Image>
        <Link to="/" className="Links">
        Home
        </Link>
        <Link to='/login' onClick={handleLogout} className="Links">
        Logout
        </Link>
        <Link to={`/${user?.username}`} className="Links">
        Profile
        </Link>
        </Header>
    </Segment>
  );
}
