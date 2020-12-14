import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import database from '@react-native-firebase/database';

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Thumbnail } from 'native-base';
const CustomFooter = ({navigation}) => {
  const [profilePicFooter,setProfilePicFooter] = useState('')
  const getProfilePic = ()=>{
    try {
        
        database()
        .ref('/profileImage/')
        .on('value',(snapshot)=>{
            console.log("Profile Picture : ",snapshot.val())
            setProfilePicFooter((snapshot.val()).image)
        })
    } catch (error) {
        console.log("ERROR OCCURE",error)
        
    }
}

useEffect(() => {
    getProfilePic()
}, []);
    return (
        <Footer>
          <FooterTab style={{backgroundColor:'#ffffff'}}> 
            <Button>
              <Icon name="home" style={{color:'#000'}} />
            </Button>
            <Button onPress={() => navigation.navigate('AddPost')}>
              <Icon name="add" style={{color:'#000'}} />
            </Button>
            <Button >
              <Icon style={{color:'#000'}} name="heart" />
            </Button>
            <Button onPress={()=> navigation.navigate('Settings')}>
              <Thumbnail source={{uri: profilePicFooter}} small  />
              
            </Button>
          </FooterTab>
        </Footer>
    )
}

export default CustomFooter
