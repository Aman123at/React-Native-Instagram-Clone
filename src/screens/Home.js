

import React, { useEffect } from 'react'
import { View ,Image, FlatList} from 'react-native'
import CustomFooter from '../layout/CustomFooter'
import CustomHeader from '../layout/CustomHeader';
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';
import StatusRow from '../layout/StatusRow'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
const Home = ({navigation,getPosts, postState, userDetails}) => {
  useEffect(() => {
    console.log('HOME COMP', postState.posts);
    getPosts();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (postState.loading) {
    return <EmptyContainer />;
  }
    return (
        <>
        <Container>
          <CustomHeader />
            <Content>
          <Card>
            <StatusRow style={{marginBottom:20}} />
            <FlatList
        data={postState.posts}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (
        
           <Post item={item} userDetails={userDetails} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found</H1>
          </Container>
        )}
      />
            
            
            
            
            
                      </Card>
        </Content>
        </Container>
            <CustomFooter navigation={navigation} />
        </>
    )
}
const mapStateToProps = (state) => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.propTypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

