import { ActivityIndicator, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Weather() {

    const [textInput,SetTextInput] = useState('');
    const [data,setData]=useState<any>([]);
    const [loading,setLoader]=useState(false);

    useEffect(()=>{
        const loaddatafromasync= async()=>{
            const input=await AsyncStorage.getItem('input');
            if(input){
                SetTextInput(JSON.parse(input));
            }
            const data1=await AsyncStorage.getItem('data')
            if(data1)
            {
                setData(JSON.parse(data1)) 
            }
        }
        loaddatafromasync();
    },[])

    const fetchData = async(input:any) =>{
        setLoader(true)
        try{
            const res=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input},Gujarat?key=LQKS9NWUXQB4T2KCS6R7FGDBS`)
            console.log(res.data);
            setData(res.data)
            const store = {
                address:res.data.address,
                latitude:res.data.latitude,
                longitude:res.data.longitude,
                description:res.data.description
            }
            await AsyncStorage.setItem('data',JSON.stringify(store));
            await AsyncStorage.setItem('input',JSON.stringify(input));
        }catch(err){
            console.error(err)
        }finally{
            setLoader(false)
        }
    }
    if(loading)
    {
        return(
            <ActivityIndicator size={'large'} color={'lightblue'}/>)
    }
    return (
    <View>

    <View style={{paddingHorizontal:10,paddingVertical:10,flexDirection:'row',columnGap:15}}>
        <View style={{borderWidth:1,paddingHorizontal:15,borderRadius:25,width:'80%'}}>
            <TextInput
            value={textInput}
            placeholder='Search City'
            onChangeText={(val)=>SetTextInput(val)}
            />
        </View>
        <View style={{backgroundColor:'lightblue',paddingHorizontal:10,alignContent:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>fetchData(textInput)}>
            <View>
                <Text>Search</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
        <View style={{backgroundColor:"lightblue",margin:"5%",paddingVertical:15,rowGap:30,justifyContent:'center',alignItems:'flex-start',paddingHorizontal:60}}>
            <Text> city : {data.address}</Text>
            <Text>latitude:{data.latitude}</Text>
            <Text>longitude:{data.longitude}</Text>
            <Text>Weather:{data.description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})