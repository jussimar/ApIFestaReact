import { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import api
 from '../componentes/Api';
export default function TelaEditCliente() {

    const navigation = useNavigation();

    const route = useRoute();

    type ClienteType = {id:number, nome:string, cpf:string, saldo:number};

    const {cliente} = route.params as {cliente: ClienteType};

    const [id, setId] = useState(String(cliente?.id ?? ''));
    const [nome, setNome] = useState(String(cliente?.nome ?? ''));
    const [cpf, setCpf] = useState(String(cliente?.cpf ?? ''));
    const [saldo, setSaldo] = useState(String(cliente?.saldo ?? ''));

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
                    const resp = await api.put('clientes', {
                        id:id,
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
            <Text style={styles.txtBtn}>Salvar Alterações</Text>
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