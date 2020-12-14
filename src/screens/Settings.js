import React from 'react'
import { View, Text,Button } from 'react-native'
import {signOut} from '../action/auth';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
const Settings = ({signOut,authState,navigation}) => {
    
    return (
        <View style={{marginTop:10}}>
            {authState.isAuthenticated && (
          <>
            
            <Button title="Logout" onPress={() => signOut()}/>
            <Button title="Change Profile Picture" onPress={() => navigation.navigate('AddProfilePic')}/>
              
          </>
        )}
            
        </View>
    )
}

const mapStateToProps = (state) => ({
    authState: state.auth,
  });
  
  const mapDispatchToProps = {
    signOut,
  };
  
  Settings.propTypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
