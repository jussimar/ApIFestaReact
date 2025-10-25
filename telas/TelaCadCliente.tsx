import { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api
 from '../componentes/Api';
export default function TelaCadCliente() {

    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [saldo, setSaldo] = useState('');

 return (

    <View style={styles.container}>
        <Text style={styles.titulo}>
            Cadastro de Clientes
        </Text>

        <View style={styles.bloco}>
            <TextInput
                placeholder='Digite o nome do cliente ...'
                value={nome}
                onChangeText={(value)=>setNome(value)}
                style={styles.input}
            />
            <TextInput
                placeholder='Digite o CPF do cliente ...'
                value={cpf}
                onChangeText={(value)=>setCpf(value)}
                style={styles.input}
                keyboardType='numeric'
            />
            <TextInput
                placeholder='Digite o valor de saldo para cliente ...'
                value={saldo}
                onChangeText={(value)=>setSaldo(value)}
                style={styles.input}
                keyboardType='numeric'
            />
        </View>
        <TouchableOpacity style={styles.btn}
            onPress={async()=>{
                try{
                    const resp = await api.post('clientes', {
                        nome:nome,
                        cpf:cpf,
                        saldo:saldo
                    });
                    Alert.alert(JSON.stringify(resp.data.message));
                    navigation.navigate('ListarClientes' as never);
                }catch{
                    Alert.alert("Deu Erro!");
                }
            }}
        >
            <Text style={styles.txtBtn}>Salvar Cliente</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF",
        alignItems:'center',
        justifyContent:'center'
    },
    titulo:{
        fontSize:35,
        fontWeight:'bold',
        marginLeft:'5%'
    },
    bloco:{
        width:'100%'
    },
    btn:{
        backgroundColor:"#669988",
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:20,
        borderRadius:20,
        width:'80%'
    },
    txtBtn:{
        textAlign:'center',
        fontSize:20
    },
    input:{
        marginLeft:'5%',
        marginRight:'5%',
        marginBottom:10,
        marginTop:10,
        backgroundColor:"rgba(156, 32, 63, 0.07)",
        borderRadius:10,
    }
});