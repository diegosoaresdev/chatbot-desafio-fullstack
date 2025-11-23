💬 Chatbot de Atendimento Simulado

Solução Full Stack desenvolvida para simular um sistema de atendimento inteligente. O projeto demonstra a integração entre um backend robusto em Django e um frontend interativo em React, focando em boas práticas de código, organização e clareza.

🛠️ Tecnologias e Ferramentas

Backend (API)

Python 3.10+: Linguagem core.

Django & Django REST Framework: Para construção de uma API RESTful segura e escalável.

SQLite: Banco de dados relacional (escolhido pela portabilidade e configuração zero).

Django CORS Headers: Para gerenciamento de segurança entre origens (Cross-Origin Resource Sharing).

Frontend (Interface)

React.js: Biblioteca para construção de interfaces reativas.

Axios: Cliente HTTP para comunicação assíncrona com a API.

Tailwind CSS: Framework de utilitários para estilização rápida, responsiva e moderna.

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente. Você precisará de dois terminais abertos (um para o servidor, outro para a interface).

Pré-requisitos

Python instalado.

Node.js e NPM instalados.

Git instalado.

Passo 1: Configurar o Backend (Servidor)

No primeiro terminal:

Acesse a pasta do backend:

cd backend


Crie e ative o ambiente virtual (Essencial para isolar as dependências):

# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate


Instale as dependências:

pip install django djangorestframework django-cors-headers


Prepare o banco de dados e inicie:

python manage.py migrate
python manage.py runserver


✅ O servidor estará rodando em: http://127.0.0.1:8000

Passo 2: Configurar o Frontend (Cliente)

No segundo terminal:

Acesse a pasta do frontend:

cd frontend


Instale as dependências:

npm install


(Nota: Certifique-se de que o axios está instalado: npm install axios)

Inicie a aplicação:

npm start


✅ Acesse no navegador: http://localhost:3000

🧠 Decisões Técnicas e Arquitetura

Para atender aos requisitos do desafio mantendo a qualidade de código, adotei as seguintes estratégias:

1. Arquitetura Desacoplada (Client-Server)

Separei a aplicação em duas camadas distintas. Isso simula um ambiente de produção real, onde o Frontend consome dados via JSON. Essa decisão facilita a manutenção e permite que o Backend seja consumido por outras plataformas (ex: Mobile) no futuro.

2. Backend: Integridade e Clareza (KISS Principle)

Tipagem Forte no Modelo: Em vez de usar strings soltas ("A", "B"), utilizei TextChoices do Django (UserType). Isso evita erros de digitação e torna o código autoexplicativo.

Lógica Centralizada: A regra de negócio que define a resposta do bot ("Se VIP, responda X") foi implementada diretamente na View de forma estruturada. Optei por não criar uma camada de serviço complexa (Overengineering) para este escopo, mantendo o código limpo e direto.

3. Frontend: Componentização e UX

Design Atômico Simplificado: Quebrei a interface em sub-componentes funcionais (LoginScreen, MessageItem). Isso melhora a legibilidade do arquivo principal e facilita testes isolados.

Gerenciamento de Estado (React Hooks):

Login Mockado: Utilizei useState para alternar entre os perfis e exibir a tela correta (Login vs Chat) condicionalmente.

Feedback Visual: Implementei estados de loading e tratamento de erros (Modo Offline) para garantir que o usuário nunca fique sem resposta, mesmo se o servidor falhar.

4. Persistência de Dados

Optei pelo SQLite nativo do Django. Além de ser rápido para desenvolvimento, ele elimina a necessidade de você configurar servidores de banco de dados (como PostgreSQL) apenas para rodar este teste, facilitando a avaliação.

📡 Documentação Rápida da API

Endpoints disponíveis em: http://127.0.0.1:8000/api

Método

Rota

Descrição

Payload / Params

GET

/chat/

Busca histórico do usuário.

?user_identifier=A

POST

/chat/

Envia mensagem e recebe resposta.

{ "user_identifier": "A", "content": "Olá" }

Desenvolvido para o Desafio Técnico.