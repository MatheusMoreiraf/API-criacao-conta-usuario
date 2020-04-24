# API-criacao-conta-usuario utilizada no curso - Implementando APIs com Apigee + Node.js + Docker + Heroku

## API para criação da conta de usuário

### Link dos curso na plataforma udemy com um cupom de desconto
- link curso 01 - \[ [https://www.udemy.com/implementando-apis-com-apigee-nodejs-docker-heroku/?couponCode=5P3C_0P3NAPI_5WAGG3](https://www.udemy.com/implementando-apis-com-apigee-nodejs-docker-heroku/?couponCode=5P3C_0P3NAPI_5WAGG3) \] com cupom de desconto

## Para executar o projeto
- Modo desenvolvimento - `npm run dev`
- Gerar build para fazer deploy no heroku - `npm run build`
- Definir os valores para as variáveis de ambiente usadas pela API  
    - `PORT={PORTA_SERVIDOR} node app.js`
    - `MONGODB_URI="mongodb://{URL_PORTA_BANCO_MONGODB}" node app.js`
    - `DEBUG="API-criacao-conta-usuario" node app.js`
    - `SECRET="{CHAVE_SECRETA_JWT}" node app.js`

[https://www.udemy.com/implementando-apis-com-apigee-nodejs-docker-heroku/?couponCode=5P3C_0P3NAPI_5WAGG3]: https://www.udemy.com/implementando-apis-com-apigee-nodejs-docker-heroku/?couponCode=5P3C_0P3NAPI_5WAGG3