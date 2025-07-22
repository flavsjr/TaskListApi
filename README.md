# TaskListApi Project

Este projeto consiste em uma API RESTful desenvolvida em ASP.NET Core e um frontend construído com SAP UI5 para gerenciar uma lista de tarefas.

## 🚀 Tecnologias Utilizadas

**Backend (API):**
* **ASP.NET Core:** Framework para construção da API REST.
* **Entity Framework Core:** ORM para acesso a dados (configurável para persistência local ou proxy remoto).
* **xUnit:** Framework para testes unitários/integração.

**Frontend (SAP UI5):**
* **SAP UI5:** Framework para construção da interface de usuário.
* **OpenUI5 CLI / ui5-tooling:** Ferramentas para desenvolvimento e build.

## ✨ Funcionalidades

* **API RESTful:**
    * `GET /todos`: Retorna uma lista de todas as tarefas.
    * `GET /todos?title={query}`: Retorna tarefas filtradas por título.
    * `GET /todos/{id}`: Retorna os detalhes de uma tarefa específica.
* **Fonte de Dados Configurável:**
    * **Proxy Remoto:** Consome dados diretamente de `https://jsonplaceholder.typicode.com/todos`.
* **Frontend SAP UI5:**
    * Exibição da lista de tarefas.
    * Funcionalidade de pesquisa por título.
    * Paginação local dos resultados.
    * Navegação para detalhes da tarefa.
* **Testes:**
    * Testes unitários/de integração para a API (com xUnit).


## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar tanto o backend quanto o frontend.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* [.NET SDK (versão 8.0 ou superior)](https://dotnet.microsoft.com/download)
* [Node.js (versão LTS recomendada)](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)
* [Visual Studio](https://visualstudio.microsoft.com/) (recomendado para o backend) ou [Visual Studio Code](https://code.visualstudio.com/)

### 1. Backend (API ASP.NET Core)

1.  **Navegar para a pasta do Backend:**
    Abra seu terminal (cmd, PowerShell, Git Bash) e navegue até a pasta do projeto da API:
    ```bash
    cd TaskListApi/TaskListApi
    ```

2.  **Restaurar Dependências:**
    ```bash
    dotnet restore
    ```

3.  **Executar a API:**
    ```bash
    dotnet run
    ```
    A API será iniciada, geralmente em `http://localhost:5000` (ou outra porta, que será exibida no terminal).

### 2. Frontend (SAP UI5)

1.  **Navegar para a pasta do Frontend:**
    Abra um **novo terminal** (mantendo o backend rodando no primeiro terminal) e navegue até a pasta do projeto do frontend:
    ```bash
    cd TaskListApi/TaskListApi.Front
    ```

2.  **Instalar Dependências Node.js:**
    ```bash
    npm install
    ```

3.  **Iniciar a Aplicação UI5:**
    ```bash
    npm start
    ```
    Isso iniciará o servidor de desenvolvimento da UI5 e abrirá a aplicação no seu navegador padrão (geralmente em `http://localhost:8080` ou similar).

### 3. Executar Testes:

1.  **Navegar para a pasta de Testes:**
    ```bash
    cd TaskListApi/TaskListApi.Tests
    ```

2.  **Executar os Testes:**
    ```bash
    dotnet test
    ```
    

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---
