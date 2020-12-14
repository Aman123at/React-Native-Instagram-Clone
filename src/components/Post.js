import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import propTypes from 'prop-types';


const Post = ({item, userDetails}) => {

    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)
    const [profilePic, setProfilePic] = useState('')
    const [pressed, setPressed] = useState(false)
    
    useEffect(() => {
      console.log("The Item is",item)
      console.log(userDetails)

      if (item.vote) {
        let upVote = 0
        let downVote = 0

        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            upVote += 1
          }

          if (val.downvote) {
            downVote += 1
          }
        })

        setUpvote(upVote)
        setDownvote(downVote)
      }


    }, [item])

    const upVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    const getProfilePic = ()=>{
        try {
            
            database()
            .ref('/profileImage/')
            .on('value',(snapshot)=>{
                console.log("Profile Picture : ",snapshot.val())
                setProfilePic((snapshot.val()).image)
            })
        } catch (error) {
            console.log("ERROR OCCURE",error)
            
        }
    }

    useEffect(() => {
        getProfilePic()
    }, []);

    

    return (
      <Card
        style={{
          backgroundColor: '#ffffff',
          
        }}>
        <CardItem
          style={{
            backgroundColor: 'transparent',
          }}>
          <Left>
            <Thumbnail source={{uri: profilePic}} small />
            <Body>
              <Text
                style={{
                  color: '#000000',
                }}>
                {item.by}
              </Text>
  
              <Text note>{item.location}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{uri: item.picture}}
            style={{height: 200, width: null, flex: 1}}
            
          />
        </CardItem>
        
  
        <CardItem
          style={{
            backgroundColor: '#ffffff',
          }}>
          <Left>
            <Button transparent onPress={upVotePost}>
              {upvote ? (
                 <Icon
                 name="heart"
                 type="Entypo"
                 style={{fontSize: 20, color: '#000000'}}
               />

              ):(

              <Icon
                name="heart"
                type="Feather"
                style={{fontSize: 20, color: '#000000'}}
              />
              )}
              <Text
                style={{
                  color: '#000000',
                }}>
                {upvote}
              </Text>
            </Button>
            <Button transparent onPress={downVotePost}>
              {downvote ? (

              <Icon
                name="thumbs-down"
                type="Entypo"
                style={{fontSize: 20, color: '#000000'}}
              />
              ):(
                <Icon
                name="thumbs-down"
                type="Feather"
                style={{fontSize: 20, color: '#000000'}}
              />

              )}
              <Text
                style={{
                  color: '#000000',
                }}>
                 {downvote}
              </Text>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              iconLeft
              onPress={() => {
                setPressed(true)
              }}>
                {pressed ? (

              <Icon
                name="bookmark"
                type="Fill"
                style={{fontSize: 20, color: '#000000'}}
              />
                ):(
                  <Icon
                name="bookmark"
                type="Feather"
                style={{fontSize: 20, color: '#000000'}}
              />
                )}
              
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  
}




export default Post