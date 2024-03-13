import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { Mnemonic } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChildProps = {
  logOut: (newVal:string) => void;
};


async function checkLogin(mnemonicString:string){
  const response = await axios.post('http://10.0.2.2:3000/mnemonic_login', {
    mnemonic:mnemonicString
  })

  return response.data
}

const Login: React.FC<ChildProps> = ({ logOut }) => {
    const [input, setInput] = useState("")

  return (
    <SafeAreaView>
      <View>
        <Text>Please enter mnemonic:</Text>
        <TextInput style={styles.input} onChangeText={(text)=>{setInput(text)}}></TextInput>
        <Button title='Log in' onPress={async()=>{
          const accountReturned = await checkLogin(input);
          console.log("account returned: ", accountReturned)
          if(accountReturned.private_key){
            const jsonData = {
              private_key:accountReturned.private_key,
              address:accountReturned.address,
              mnemonic:accountReturned.mnemonic.phrase
            }
            AsyncStorage.setItem("user", JSON.stringify(jsonData))
            logOut("loggedIn")}
          }}></Button>
        <Button title='Back' onPress={()=>{logOut("")}
        }
          ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    input:{
        borderWidth:3,
        borderColor:"black"
    }

});

export default Login;
