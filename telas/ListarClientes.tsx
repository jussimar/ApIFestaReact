import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Cliente from '../componentes/Cliente';

import api from '../componentes/Api';

export default function ListarClientes() {

type ClienteType = {id:number, nome:string, cpf:string, saldo:number};

const [clientes, setClientes] = useState<ClienteType[]>([]);

 async function buscaClientes() {
    const response = await api.get('clientes');
    setClientes(response.data);
 }

 useEffect(
    ()=>{
        buscaClientes();
    },[]
 )
 return (
    <View style={styles.container}>
       


        <View style={styles.bloco}>
            <TouchableOpacity style={styles.btn}>
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
        fontWeight:'bold'
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
     height:'70%'   
    }
});