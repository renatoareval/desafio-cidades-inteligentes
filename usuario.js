
// Exemplo de utilização:

// npm install - para instalar os pacotes
// npm run dev - para rodar o arquivo usuario.js
// npm run test - para rodar o teste

import bcrypt from 'bcrypt';


let usuarios = []


export async function criarUsuario(nome, email, senha, permissoes) {
  if (!validarSenha(senha) || !validarEmail(email) || !emailUnico(email)) {
    return "Erro ao criar usuário";
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    senha: await bcrypt.hash(senha, 10),
    permissoes: permissoes,
    dataCriacao: new Date(),
    ultimaDataDeLogin: null,
    ativo: true,
  };

  usuarios.push(novoUsuario)
  return "Usuario criado com sucesso"
}


export function validarSenha(senha) {
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regexSenha.test(senha);
}


export function validarEmail(email) {
  const regexEmail = /\S+@\S+\.\S+/
  return regexEmail.test(email)
}


export function emailUnico(email) {
  return !usuarios.some((usuario) => usuario.email === email)
}


export async function login(email, senha) {
  const usuario = usuarios.find((user) => user.email === email)
  if (usuario) {
    const senhaUsuario = String(usuario.senha)
    if (await bcrypt.compare(String(senha), senhaUsuario)) {
      usuario.ultimaDataDeLogin = new Date()

      return "Login bem-sucedido"
    } else {
      return "Dados inválidos"
    }
  } else {
    return "Usuario não encontrado"
  }
}


export function desativarUsuario(email) {
  const usuario = usuarios.find((user) => user.email === email);
  if (usuario) {
    usuario.ativo = false;
    return "Usuario desativado com sucesso"
  } else {
    return "Usuario não encontrado"
  }
}

export function listarUsuarios() {
  return usuarios;
}


// essa função serve só para testar manualmente


async function teste() {
  await criarUsuario("Maria", "maria@gmail.com", "Teste@123", ["usuario", "adm"])
  console.log("Usuário criado:", listarUsuarios())

  const loginStatus = await login("maria@gmail.com", "Teste@123")
  console.log(loginStatus)
  console.log("Dados após login:", listarUsuarios())

  
  const desativarStatus = desativarUsuario("maria@gmail.com")
  console.log(desativarStatus)
  console.log("Dados após desativar:", listarUsuarios())
 
}

  teste();  // chamando a função






