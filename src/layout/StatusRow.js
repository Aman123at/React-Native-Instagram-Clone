import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Left, Body, Thumbnail} from 'native-base';
import database from '@react-native-firebase/database';
const StatusRow = () => {
  const [profilePicStatus, setProfilePicStatus] = useState('');

  const getProfilePic = () => {
    try {
      database()
        .ref('/profileImage/')
        .on('value', (snapshot) => {
          console.log('Profile Picture : ', snapshot.val());
          setProfilePicStatus(snapshot.val().image);
        });
    } catch (error) {
      console.log('ERROR OCCURE', error);
    }
  };

  useEffect(() => {
    getProfilePic();
  }, []);
  return (
    <ScrollView horizontal={true} style={{flexDirection: 'row', marginTop: 10}}>
      <View style={{alignItems: 'center'}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{uri: profilePicStatus}}
        />
        <Text style={{marginTop: 1}}>Your Story</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 3}}>
        <Thumbnail
          style={{marginLeft: 10, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'https://www.gstatic.com/tv/thumb/persons/487130/487130_v9_bb.jpg',
          }}
        />
        <Text style={{marginTop: 1}}>elonMusk1</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 1}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg',
          }}
        />
        <Text style={{marginTop: 1}}>sunder_pichai</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 1}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'data:image/jpeg;base64,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',
          }}
        />
        <Text style={{marginTop: 1}}>mark_zuk11</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 1}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455',
          }}
        />
        <Text style={{marginTop: 1}}>jeff_bez</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 1}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'https://assets.telegraphindia.com/telegraph/3a5a355e-376c-4143-83c9-9f9436587b56.jpg',
          }}
        />
        <Text style={{marginTop: 1}}>virat_18</Text>
      </View>
      <View style={{alignItems: 'center',marginLeft: 1}}>
        <Thumbnail
          style={{marginLeft: 5, height: 75, width: 75, borderRadius: 999}}
          source={{
            uri:
              'data:image/jpeg;base64,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'
          }}
        />
        <Text style={{marginTop: 1}}>tim_cook</Text>
      </View>
    </ScrollView>
  );
};

export default StatusRow;
