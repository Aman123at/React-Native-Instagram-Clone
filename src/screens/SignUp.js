import React, { useState } from 'react'
import { View, Text,Button } from 'react-native'
import {Form, Input, Item,Content, Container,Thumbnail, Footer} from 'native-base'
import storage from '@react-native-firebase/storage';
import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';

const SignUp = ({navigation,signUp}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doSignUp = async ()=>{
    signUp({email,name,username,password})
    

  }
    return (
        <>
    
        <Container>
        <Thumbnail style={{width:220,height:100,marginLeft:85,marginTop:60,marginBottom:70}} square small source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbo5MAitpPF6PC5n17Db3g733NW514HUzyQ&usqp=CAU'}} />

        <Content>

          <Form>
            <Item>
              <Input value={email} onChangeText={text => setEmail(text)} placeholder="Enter Your Email" />
            </Item>
            <Item>
              <Input value={name} onChangeText={text => setName(text)} placeholder="Full Name" />
            </Item>
            <Item>
              <Input value={username} onChangeText={text => setUsername(text)} placeholder="Username" />
            </Item>
            <Item last>
              <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} style={{marginBottom:10}} placeholder="Password" />
            </Item>
            <Button onPress={doSignUp} title="sign up" />
          </Form>
        </Content>
        <Footer>
            <Text onPress={() => navigation.navigate('SignIn')} style={{marginTop:10,color:'white'}}>Already have an account? Sign In</Text>
        </Footer>
      </Container>
      </>
    )
}

const mapDispatchToProps = {
  signUp:(data) => signUp(data)
}

SignUp.propTypes = {
  signUp:propTypes.func.isRequired
}

export default connect(null,mapDispatchToProps)(SignUp)
