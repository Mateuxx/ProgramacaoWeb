### 1) Porque em um sistema multiusuário implementado em Node.JS é importante evitar o uso de chamadas de I/O bloqueantes?
- Solução: Bom mesmo quesito de android as requisões a web, acesso a bando de dados ou qualquer
operação que seja de service, deve ser evitada se tratando de multi-usuários pois podem bloquear o Event Loop para outros usuários

### 2) O que é callback hell e como evitá-los através do uso de Promises e async/await? Mostre exemplos de códigos onde o uso de Promises e async/await resolva o problema do callback hell.
- Solução: Para lidar com as operações assincronas, são feitas longas cadeias de callbacks, isso eh chamado pela comunidade de callback hell ou código hadouken

### 4 e 5) Quais são as diferenças entre frameworks opinativos e não opinativos? Em qual dessas classes o framework Express melhor se encaixa?
- **O express é não opinativo e minimalista**, ou seja, eu teenho que tomar decisões de como vou organizar meu código ou coisas nesse sentido, sendo ele minimalista eu posso até mesmo escolher
diferentees modulos para usar em minha aplicação.

7) O que são Middlewares e como são usados no framework Express? Desenvolva um
middleware capaz de imprimir no console (usando a função console.log()) qual o método
HTTP (Get, Post, Patch, etc) usando em uma requisição ao sistema.7) O que são Middlewares e como são usados no framework Express? Desenvolva um
middleware capaz de imprimir no console (usando a função console.log()) qual o método
HTTP (Get, Post, Patch, etc) usando em uma requisição ao sistema.

**OBS:** O restante foi feito no carderninho: 