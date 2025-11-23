💬 Chatbot de Atendimento Simulado

Solução Full Stack desenvolvida para simular um sistema de atendimento inteligente. O projeto demonstra a integração entre um backend robusto em Django e um frontend interativo em React, focando em boas práticas de código ("Clean Code"), arquitetura desacoplada e experiência do utilizador (UX).

Nota de Segurança: A SECRET_KEY foi mantida no arquivo settings.py intencionalmente para facilitar a execução local e avaliação do projeto. Em um ambiente de produção real, chaves sensíveis seriam gerenciadas estritamente através de variáveis de ambiente (.env).

✨ Features (Funcionalidades)

Login Simulado: Alternância fluida entre perfis (Usuário A e Usuário B) utilizando renderização condicional, sem a complexidade de autenticação real.

Feedback Visual & Resiliência: Interface reativa que exibe status de carregamento e implementa um Modo Offline automático caso a conexão com a API falhe.

Histórico Persistente: As mensagens são persistidas no banco de dados SQLite e recuperadas dinamicamente via requisições GET, garantindo integridade dos dados.

Lógica de Resposta Dinâmica: O backend processa o identificador do usuário e gera respostas personalizadas baseadas no perfil (VIP vs Padrão).

🛠 Tecnologias Utilizadas

Backend (API)

Python 3.10+ (Linguagem Core)

Django & Django REST Framework (Construção de API RESTful)

SQLite (Banco de dados relacional pela portabilidade)

Django CORS Headers (Gerenciamento de segurança entre origens)

Frontend (Interface)

React.js (Biblioteca de UI baseada em componentes funcionais)

Axios (Cliente HTTP Promise-based para consumo de API)

Tailwind CSS (Estilização utilitária para design responsivo e moderno)

🧠 Decisões Técnicas e Arquitetura

O desenvolvimento deste projeto foi guiado por princípios de Simplicidade (KISS) e Manutenibilidade. Abaixo detalho as escolhas arquiteturais:

1. Estrutura de Dados e Models (Django)

Optei por utilizar TextChoices para o campo user_identifier no model Message.

Por quê? Isso evita o uso de "strings mágicas" (como 'A' ou 'B' soltos no código). Centralizar essas opções no Model garante integridade de dados e facilita a manutenção caso os tipos de usuários mudem no futuro.

2. Gerenciamento de Estado (React)

Escolhi utilizar apenas os hooks nativos (useState, useEffect) em vez de bibliotecas complexas como Redux ou Context API.

Por quê? Para o escopo deste desafio, introduzir Redux seria "overengineering". O estado local é suficiente para gerenciar o fluxo de currentUser, inputs de chat e histórico, mantendo o bundle leve e o código legível.

3. Lógica de Negócio (Backend)

A regra de decisão da resposta do bot ("Se VIP, responda X") foi implementada diretamente na View.

Por quê? Embora em sistemas grandes se use uma camada de Services, para este MVP a implementação direta na View reduz a complexidade cognitiva e facilita a leitura do fluxo de dados pelo avaliador.

4. Componentização (Frontend)

A interface foi refatorada em sub-componentes funcionais (LoginScreen, MessageItem).

Por quê? Segue o princípio de responsabilidade única do React. Isso isola a lógica de apresentação da lógica de estado, tornando o componente principal App.js mais limpo e focado na integração com a API.

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação em seu ambiente local.

Pré-requisitos

Certifique-se de ter instalado: Python, Node.js e Git.

Passo 1: Backend (Servidor)

No primeiro terminal:

1. Acesse a pasta e crie o ambiente virtual:

cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate


2. Instale as dependências e inicie o servidor:

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver


✅ O servidor rodará em: http://127.0.0.1:8000

Passo 2: Frontend (Cliente)

No segundo terminal:

1. Acesse a pasta do frontend:

cd frontend


2. Instale os pacotes e execute:

npm install
npm start


✅ Acesse no navegador: http://localhost:3000

📡 Documentação da API

Base URL: http://127.0.0.1:8000/api

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

Envia mensagem nova.

{ "user_identifier": "A", "content": "Texto" }