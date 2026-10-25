import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { storage } from './src/storage/storage';

import Cadastro from './src/screens/Cadastro';
import Confirmacao from './src/screens/Confirmacao';

export default function App() {
  // Lê o MMKV ao iniciar de forma síncrona. Se tiver dado, inicia na Confirmação.
  const cadastroSalvo = storage.getString('cadastro');
  const [telaAtual, setTelaAtual] = useState(cadastroSalvo ? 'confirmacao' : 'cadastro');

  return (
    <ThemeProvider>
      <View style={styles.container}>
        {telaAtual === 'cadastro' ? (
          <Cadastro onCadastrado={() => setTelaAtual('confirmacao')} />
        ) : (
          <Confirmacao onNovoCadastro={() => setTelaAtual('cadastro')} />
        )}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});