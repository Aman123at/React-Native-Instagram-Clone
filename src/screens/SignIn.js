import React, { useState } from 'react';
import {View, Text, Image, StyleSheet,TextInput,Button} from 'react-native';
import CustomHeader from '../layout/CustomHeader';
import {Form, Input, Item,Content, Container,Thumbnail, Footer} from 'native-base'

import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import propTypes from 'prop-types'


const SignIn = ({navigation,signIn}) => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doSignIn = () => {
        signIn({email, password})
    }

  return (
      <>
    
        <Container>
        <Thumbnail style={{width:220,height:100,marginLeft:85,marginTop:60,marginBottom:70}} square small source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbo5MAitpPF6PC5n17Db3g733NW514HUzyQ&usqp=CAU'}} />

        <Content>

          <Form>
            <Item>
              <Input value={email} onChangeText={text => setEmail(text)} placeholder="Email" />
            </Item>
            <Item last>
              <Input value={password} onChangeText={text => setPassword(text)} style={{marginBottom:10}} secureTextEntry={true} placeholder="Password" />
            </Item>
            <Button onPress={doSignIn} title="sign in" />
          </Form>
        </Content>
        <Footer>
            <Text onPress={()=> navigation.navigate('SignUp')} style={{marginTop:10,color:'white'}}>Don't have an account? Sign Up</Text>
        </Footer>
      </Container>
      </>
        
        
      
      
    
  );
};

const mapDispatchToProps = {
  signIn: (data) => signIn(data)
}

SignIn.propTypes = {
  signIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn)


