import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment, Message } from "semantic-ui-react";
import userService from "../../utils/userService";
import './SignupPage.css'
import { useNavigate } from "react-router-dom";


export default function SignUpPage(props) {

  const [error, setError] = useState('')
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  })

  const [selectedFile, setSelectedFile] = useState('')

  const navigate = useNavigate()

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
  const formData = new FormData();
  formData.append('photo', selectedFile);
  for (let key in state){
    formData.append(key, state[key])
  }
    try{
      await userService.signup(formData)
      props.handleSignUpOrLogin()
      navigate('/')
    }catch(err){
      setError(err.message)
    }
  }

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 900 }}>
        <Header as="h2" textAlign="center">
          <h1>Sign Up</h1>
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked style={{backgroundColor: 'black'}}>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="confirm password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              name="bio"
              placeholder="About Yourself!"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
                required
              />
            </Form.Field>
            <Button type="submit" className="btn" style={{backgroundColor: 'grey', color: 'white'}}>
              Signup
            </Button>
          </Segment>
          <Message style={{color: 'white', backgroundColor: 'black'}}>
          {error ? <ErrorMessage error={error} /> : null}
          </Message>
        </Form>
      </Grid.Column>
    </Grid>
  );
}