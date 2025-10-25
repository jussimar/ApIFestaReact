import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import Cliente from '../componentes/Cliente';

import api from '../componentes/Api';

import { useNavigation } from '@react-navigation/native';

export default function ListarClientes() {

type ClienteType = {id:number, nome:string, cpf:string, saldo:number};

const [clientes, setClientes] = useState<ClienteType[]>([]);

const navigation = useNavigation();

 async function buscaClientes() {
    const response = await api.get('clientes');
    setClientes(response.data);
 }

 async function excluir(id: number) {
    try{
        const r = await api.delete(`clientes/${id}`);
        Alert.alert("Excluir", `${JSON.stringify(r.data)}`);
        buscaClientes();
    }catch(e: any){
        Alert.alert("Erro ao Excluir",e?.message ?? "Erro desconhecido");
    }
 }

 function editar(item:ClienteType){
    navigation.navigate('TelaEditCliente' as never, {cliente: item} as never);
 }

 useEffect(
    ()=>{
        buscaClientes();
    },[]
 )
 return (
    <View>
       
        <View style={styles.bloco}>
            <TouchableOpacity style={styles.btn}
            onPress={()=>navigation.navigate('TelaCadCliente' as never)}
            >
                <Text style={styles.txtBtn}>Cadastrar Novo Cliente</Text>
            </TouchableOpacity>
        </View>

            <Text style={styles.titulo}>Listagem de clientes</Text>
        
         <View>
            <FlatList 
                data={clientes}
                keyExtractor={(item) => String(item.id)}
                renderItem={
                    ({item})=><Cliente 
                        nome={item.nome}
                        cpf={item.cpf}
                        saldo={item.saldo}
                        id={item.id}
                        onEditar={()=>editar(item)}
                        onExcluir={()=>excluir(item.id)}
                    />
                }
                 style={styles.lista}
            />
        </View>
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
        marginLeft:'10%'
    },
    bloco:{
        width:'100%'
    },
    btn:{
        backgroundColor:"#669988",
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:20,
        borderRadius:20
    },
    txtBtn:{
        textAlign:'center',
        fontSize:20
    },
    lista:{
     width:'90%',
     height:'80%',
     marginLeft:'10%'
    }
});