# wirc - The web irc

## Monorepo

Para facilitar o compartilhamento de código, foi adotada a estratégia de MonoRepo. Os projetos
`web` e `api` compartilham código através de `common`, assim podendo extrair o melhor de Javascript no backend e no frontend.

## Probleminhas técnicos

O projeto seria desenvolvido com mongodb, mas meu PC acabava ficando sem RAM para subir o frontend, backend e o banco. Então o banco acabou sendo um `Map` do Javascript. Ao reiniciar o server, todos os dados serão perdidos :/

### Start

Graças ao esquema de monorepo, é bastante simples iniciar o projeto para testar local, basta fazer:

```bash
yarn # devido ao workspace só funcionar com yarn
# caso haja algum erro, você deverá entrar em cada diretório 
# dentro de packages e rodar um yarn

# Rode somente em caso de erro
cd packages/common && yarn
cd packages/api && yarn
cd packages/web && yarn

# E finalmente
yarn start 
```

### Build

Tão simples quanto o `install`. Após as dependências instaladas, você precisará apenas rodar 

```bash
yarn build
```

### Test

Os testes foram apenas para testar a validação e o registro de usuário (nada muito complexo e tenho ciência de que deveriam ter mais testes). Mas para realizar os testes, basta executar:

```bash
cd packages
find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && npx jest" \;
```
