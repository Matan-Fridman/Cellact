import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChildProps = {
    logOut: (newVal:string) => void;
  };


async function transferCoins(pk:string, _recipient:string, _amount:number){
   try {
        console.log("s")
        const request = await axios.post('http://10.0.2.2:3000/transfer', {
            private_key:pk,
            recipient:_recipient,
            amount:_amount
        });
        
      } catch (error) {
        console.error('Error generating wallet:', error);
      }
}

async function checkBalance(add:string) {
    try {
        const response = await axios.post('http://10.0.2.2:3000/check_balance', {
            address:add,
        });
        console.log(response.data)
        return response.data
      } catch (error) {
        console.error('Error generating wallet:', error);
      }
}


const MainScreen: React.FC<ChildProps> = ({ logOut }) => {
  const [user, setUser] = useState({
    privateKey: '',
    address: '',
    mnemonic: '',
  });
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(0);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const setLoggedInUser = async () => {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUser({
        privateKey: user.private_key,
        address: user.address,
        mnemonic: user.mnemonic,
      });

      const fetchedBalance = await checkBalance(user.address);
      setBalance(fetchedBalance);
    };

    setLoggedInUser();
  }, [reload]);

  return (
    <SafeAreaView>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Private key:</Text>
        <Text style={styles.text}>{user.privateKey}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.text}>{user.address}</Text>

        <Text style={styles.label}>Mnemonic:</Text>
        <Text style={styles.text}>{user.mnemonic}</Text>

        <Text style={styles.title}>CURRENT BALANCE:</Text>
        <Text style={styles.balance}>{balance}</Text>

        <Text style={styles.title}>TRANSFER ETH</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          onChangeText={(text) => {
            setAmount(Number(text));
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChangeText={(text) => {
            setRecipient(text);
          }}
        />
        <Button
          title="Transfer"
          onPress={async () => {
            if (balance > amount && amount > 0) {
              await transferCoins(user.privateKey, recipient, amount);
              setReload(reload + 1);
              Alert.alert('Nice', 'Transaction complete');
              setAmount(0);
              setRecipient('');
            } else {
              Alert.alert('ERROR', 'Transaction incomplete');
            }
          }}
        />
        <Button
          title="Log out"
          onPress={async () => {
            await AsyncStorage.clear();
            logOut('');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    height:"100%"
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
});

export default MainScreen;

// anxiety shiver advice napkin october cruise across enemy fall comfort derive come
//PK: 0x20c222