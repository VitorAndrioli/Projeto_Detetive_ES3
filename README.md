# Projeto_Detetive_ES3

Pra mexer no front:

Node.js

Visual Studio Code ou qlqr outro editor

na primeira vez q for usar{

cmd.exe

npm install -g @angular/cli

vai na pasta do projeto pelo prompt

cd front

npm install


pra rodar o prj localmente:

npm start (na pasta front)

## Back-end

O back-end está implementado usando Maven e Spring Boot. Para desenvolver, o mais fácil é import o projeto Maven em uma IDE, como [Eclipse](https://eclipse.org/), [Netbeans](https://netbeans.org) ou [Intellij IDEA](https://www.jetbrains.com/idea/).

Para executar o projeto localmente, execute a classe `DetetiveApplication` na IDE, ou execute na linha de comando (dentro do diretório `back`):

### Linux e macOS

	./mvnw spring-boot:run

### Windows

	mvnw.cmd spring-boot:run

O projeto roda por padrão na porta **18080**, para modificar, edite o arquivo `resources/application.properties`.

O back-end está configurando com Maven, e já possui as dependências:

- `spring-boot-starter-data-jpa` para acesso a banco de dados;
- `spring-boot-starter-security` para configuração de segurança (acesso autorizado, permissões etc.);
- `spring-boot-starter-websocket` para websockets (caso seja necessário);
- `spring-boot-starter-thymeleaf` para templates HTML (caso seja necessário);
- `mysql-connector-java`
