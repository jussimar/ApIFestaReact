import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface propCliente{
    id:number,
    nome:String,
    cpf:String,
    saldo:number,
}

export default function Cliente({id, nome,cpf, saldo}:propCliente) {
 return (
    <>
        <Text style={styles.texto}>Cod.: {id}</Text>
        <Text style={styles.texto}>Nome.: {nome}</Text>
        <Text style={styles.texto}>CPF.: {cpf}</Text>
        <Text style={styles.texto}>Saldo.: {saldo}</Text>
        <View style={styles.row}>
            <TouchableOpacity style={styles.btn2}>
                <Text style={styles.txtBtn}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.txtBtn}>Excluir</Text>
            </TouchableOpacity>
        </View>
    </>
   
  );
}

const styles = StyleSheet.create({
    texto:{
       fontSize:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        width:'80%'
    },
    btn1:{
        flex:1,
        backgroundColor:'#E41b40FF',
        padding:15,
        borderRadius:10,
        margin:10
    },
    btn2:{
        flex:1,
        backgroundColor:'#181fdbaa',
        padding:15,
         borderRadius:10,
         margin:10
    },
    txtBtn:{
        textAlign:'center'
    }

});