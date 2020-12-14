import React from 'react'
import { View ,Image} from 'react-native'
import {Body, Right, Button, Icon, Title, Text, Header, Left, Thumbnail} from 'native-base';

const CustomHeader = ({navigation}) => {
    return (
        <Header
      androidStatusBarColor="#0f4c75"

      style={{backgroundColor: '#FFFFFF'}}>

          <Left>
              <Icon name="camera-outline" fontSize="10" />
          </Left>
          <Body>
          <Thumbnail style={{width:120,marginLeft:50}} square small source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbo5MAitpPF6PC5n17Db3g733NW514HUzyQ&usqp=CAU'}} />
        {/* <Title>Social App LCO</Title> */}
      </Body>
      <Right>
      <Icon style={{marginRight:10}} name="search-outline" />
      <Icon style={{marginRight:10}} name="send-outline" />

      </Right>
          </Header>
    )
}

export default CustomHeader
