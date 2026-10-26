import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar, ListItem, Divider } from '@rneui/themed';
import { storage } from '../storage/storage';

export default function Confirmacao({ onNovoCadastro }) {
  // Lê os dados direto do MMKV de forma síncrona
  const dadosSalvos = storage.getString('cadastro');
  const usuario = dadosSalvos ? JSON.parse(dadosSalvos) : {};

  // Função para pegar as iniciais do nome para colocar no Avatar
  const getIniciais = (nomeCompleto) => {
    if (!nomeCompleto) return 'U';
    const partes = nomeCompleto.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h4 style={styles.mensagemSucesso}>Cadastro realizado!</Text>
      
      <Card containerStyle={styles.cartao}>
        <Card.Title>Dados cadastrados</Card.Title>
        <Card.Divider />
        
        <View style={styles.avatarContainer}>
          <Avatar
            size={80}
            rounded
            title={getIniciais(usuario.nome)}
            containerStyle={{ backgroundColor: '#2089dc' }}
          />
          <Text h4 style={styles.nome}>{usuario.nome}</Text>
        </View>

        <Divider style={styles.divisor} />

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Subtitle>E-mail</ListItem.Subtitle>
            <ListItem.Title>{usuario.email}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Subtitle>Telefone</ListItem.Subtitle>
            <ListItem.Title>{usuario.telefone}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem>
          <ListItem.Content>
            <ListItem.Subtitle>Data do Cadastro</ListItem.Subtitle>
            <ListItem.Title>{usuario.dataCadastro}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>

      <Button
        title="NOVO CADASTRO"
        type="outline"
        buttonStyle={styles.botao}
        onPress={onNovoCadastro}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  mensagemSucesso: {
    textAlign: 'center',
    color: '#28a745',
    marginBottom: 16,
  },
  cartao: {
    borderRadius: 12,
    marginHorizontal: 0,
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nome: {
    marginTop: 12,
    color: '#333',
  },
  divisor: {
    marginBottom: 16,
  },
  botao: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
  },
});