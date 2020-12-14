import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Container, Content, Thumbnail, Text, Footer, H1} from 'native-base';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {getProfile} from '../action/auth'
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar'
const AddProfilePic = ({navigation}) => {
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  
  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };
  const uploadImage = async (response) => {
    setImageUploading(true);
    const reference = storage().ref(response.fileName);

    const task = reference.putFile(response.path);
    task.on('state_changed', (taskSnapshot) => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;

      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const sendToDb = ()=>{
    database()
        .ref('/profileImage/')
        .set({
            image
        })
        .then(()=> console.log('Data set success'))

        Snackbar.show({
            text:'profile pic added',
            textColor:'white',
            backgroundColor:'#1b262c'
        })


    
    navigation.navigate('Home')
  }

  

  return (
    <>
      <Container>
        <Content>
          <H1 style={{textAlign:'center',marginTop:20}}>Add Profile Picture</H1>

          {imageUploading && (
            <ProgressBar
              progress={uploadStatus}
              style={{width: null, marginBottom: 20}}
            />
          )}
          <TouchableOpacity onPress={chooseImage}>
            <Thumbnail style={{alignItems:'center',justifyContent:'center',marginLeft:90,marginTop:100,height:250,width:250,borderRadius:999}} large source={{uri: image}} />
          </TouchableOpacity>
        </Content>
        <Footer>
          <Text
            onPress={sendToDb }
            style={{marginTop: 10, color: 'white'}}>
            GoTo Home Page
          </Text>
        </Footer>
      </Container>
    </>
  );
};



export default AddProfilePic;
