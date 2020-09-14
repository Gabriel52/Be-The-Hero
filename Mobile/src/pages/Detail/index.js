import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons';
import {View, Image, TouchableOpacity,Text, Linking} from 'react-native';
import style from './style';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';


function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrano em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${
    Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(incident.value)
    }`
    
    function NavigateBack() {
        navigation.goBack()
    }
    
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={NavigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>
            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop:0}]}>Ong:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>Caso:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>Valor:</Text>
                <Text style={style.incidentValue}>{
                Intl.NumberFormat('pt-BR', {style:'currency',
                currency:'BRL'})
                .format(incident.value)}</Text>
            </View>
            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Salve o heroi desse caso.</Text>

                <Text style={style.heroDescription}>Entre em contato</Text>
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Detail;