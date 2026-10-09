# RolêRadar

## Integrantes

- Thainá Santos do Nascimento - RA: 2040482513036

## Como executar

Caso tenha clonado este repositório em outra máquina, algumas  cconfigurações devem ser feitas antes de rodar o projeto.

1. Abra um terminal na pasta do projeto.

2. Instale as dependências:

'npm install'

3. Abra o arquivo 

'src/utils/chaves.js'

4. Nesse arquivo, substitua COLOQUE_SUA_CHAVE_AQUI pelas chaves corretas:

'export const GEOAPIFY_KEY = 'COLOQUE_SUA_CHAVE_AQUI''
'export const PRIMEUI_LICENSE = 'COLOQUE_SUA_CHAVE_AQUI''

A 'GEOAPIFY_KEY' deve ser obtida na Geoapify.
A 'PRIMEUI_LICENSE' deve ser preenchida com a chave da licença Community utilizada no projeto.

5. Depois de configurar as chaves, inicie a aplicação:

'npm run dev'

6. O Vite mostrará no terminal o endereço para abrir a aplicação no navegador, normalmente:

'http://localhost:5173/'

7. Quando a aplicação abrir, o navegador vai pedir permissão para acessar sua localização. É preciso permitir o acesso para que o RolêRadar consiga mostrar sua posição e buscar lugares próximos.