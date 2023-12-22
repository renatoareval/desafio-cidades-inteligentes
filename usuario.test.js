import bcrypt from 'bcrypt'
import {
  criarUsuario,
  validarSenha,
  validarEmail,
  emailUnico,
  login,
  desativarUsuario
 
} from './usuario'

describe('Funções de Usuário', () => {
  let usuarios = []

  beforeEach(() => {
    usuarios = []
  })

  test('Criar novo usuário com sucesso', async () => {
    const resultado = await criarUsuario('Renato', 'renato@gmail.com', 'Senha@123', 'user')
    expect(resultado).toBe('Usuario criado com sucesso')

  })

  test('Validar senha correta', () => {
    const senhaValida = validarSenha('Senha@123')
    expect(senhaValida).toBe(true)
  })

  test('Validar email correto', () => {
    const emailValido = validarEmail('renato@gmail.com')
    expect(emailValido).toBe(true)
  })

  test('Verificar se o email é único', () => {
    usuarios.push(
      {
        nome: 'Renato',
        email: 'renato@gmail.com',
        senha: 'hash',
        permissoes: 'user',
        dataCriacao: new Date(),
        ultimaDataLogin: null,
        ativo: true
      })
    const emailUnicoResultado = emailUnico('novoemail@example.com')
    expect(emailUnicoResultado).toBe(true)
  })

  test('Realizar login com sucesso', async () => {
    usuarios.push(
      {
        nome: 'Renato',
        email: 'renato@gmail.com',
        senha: await bcrypt.hash('Senha@123', 10),
        permissoes: 'user',
        dataCriacao: new Date(),
        ultimaDataLogin: null,
        ativo: true
      })
    const resultado = await login('renato@gmail.com', 'Senha@123')
    expect(resultado).toBe('Login bem-sucedido')
  })

  test('Desativar usuário existente', () => {
    const resultado = desativarUsuario('renato@gmail.com')
    expect(resultado).toBe('Usuario desativado com sucesso')
  })

  test('Desativar usuário não encontrado', () => {
    const resultado = desativarUsuario('jose@hotmail.com')
    expect(resultado).toBe('Usuario não encontrado')
  })

 
})




