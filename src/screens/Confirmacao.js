import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Input, Button } from '@rneui/themed'; // Removido o import do Icon
import { storage } from '../storage/storage';

export default function Cadastro({ onCadastrado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  
  // Objeto de estado para guardar os erros de cada campo
  const [erros, setErros] = useState({});

  const validarEGravar = () => {
    let errosAtuais = {};
    let formValido = true;

    // Validação de Nome
    if (!nome.trim()) {
      errosAtuais.nome = 'O nome não pode ficar vazio.';
      formValido = false;
    }

    // Validação de E-mail (formato básico)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      errosAtuais.email = 'O e-mail não pode ficar vazio.';
      formValido = false;
    } else if (!emailRegex.test(email)) {
      errosAtuais.email = 'Informe um e-mail válido.';
      formValido = false;
    }

    // Validação de Telefone (remove tudo que não for número e conta)
    const apenasNumeros = telefone.replace(/\D/g, '');
    if (!telefone.trim()) {
      errosAtuais.telefone = 'O telefone não pode ficar vazio.';
      formValido = false;
    } else if (apenasNumeros.length < 10) {
      errosAtuais.telefone = 'Informe um telefone válido (mínimo 10 dígitos).';
      formValido = false;
    }

    // Validação de Senha
    if (!senha) {
      errosAtuais.senha = 'A senha não pode ficar vazia.';
      formValido = false;
    } else if (senha.length < 6) {
      errosAtuais.senha = 'A senha deve ter pelo menos 6 caracteres.';
      formValido = false;
    }

    setErros(errosAtuais);

    // Se estiver tudo certo, salva no MMKV
    if (formValido) {
      const dadosCadastro = {
        id: Date.now().toString(),
        dataCadastro: new Date().toLocaleDateString(),
        nome,
        email,
        telefone,
        senha
      };

      storage.set('cadastro', JSON.stringify(dadosCadastro));
      onCadastrado(); // Avisa o App.js para trocar de tela
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text h3 style={styles.titulo}>Cadastro</Text>

        <Input
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          errorMessage={erros.nome}
        />

        <Input
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={erros.email}
        />

        <Input
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          errorMessage={erros.telefone}
        />

        <Input
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          errorMessage={erros.senha}
        />

        <Button
          title="CADASTRAR"
          buttonStyle={styles.botao}
          onPress={validarEGravar}
        />
      </View>
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
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#2089dc',
  },
  botao: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
  },
});