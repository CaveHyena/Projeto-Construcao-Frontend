Para funcionar você tem que:
1. Dar checkout develop
2. Criar uma pasta "config" dentro da pasta "backend"
3. Adicionar um arquivo "config.env" dentro da pasta que acabou de criar
4. Escrever dentro do "config.env":

PORT = 4000
FRONTEND_URL = [link do seu localhost]
MONGO_URI = [atlas, com o perfil e senha]

5. Abrir terminal integrado tanto do "backend" quanto do "frontend" e digitar "npm i"  e "npm install --save-dev nodemon"
