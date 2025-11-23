💬 Chatbot de Atendimento Simulado

Solução Full Stack desenvolvida para simular um sistema de atendimento inteligente. O projeto demonstra a integração entre um backend robusto em Django e um frontend interativo em React, focando em boas práticas de código, organização e clareza.

✨ Features (Funcionalidades)

Login Simulado: Alternância simples entre perfis (Usuário A e Usuário B) sem complexidade de autenticação.

Feedback Visual: Interface reativa que exibe status de Carregando... e mensagens de erro (Modo Offline) caso a API falhe.

Histórico Persistente: As mensagens são salvas no SQLite e recuperadas dinamicamente via requisições GET.

Respostas Dinâmicas: O backend processa o user_identifier e retorna respostas personalizadas automaticamente.

🛠 Tecnologias Utilizadas

Backend (API)

Python 3.10+ (Linguagem Core)

Django & Django REST Framework (Estrutura da API)

SQLite (Banco de dados padrão)

Django CORS Headers (Segurança entre origens)

Frontend (Interface)

React.js (Biblioteca de UI baseada em componentes)

Axios (Cliente HTTP para consumo de API)

Tailwind CSS (Estilização utilitária e responsiva)

📖 Principais Conceitos Aplicados

Este projeto focou em aplicar fundamentos de arquitetura e código limpo.

1. Consumo de API & Tratamento de Erros

O frontend utiliza o Axios para comunicação assíncrona. O código implementa blocos try...catch...finally para:

try: Tentar enviar/buscar mensagens.

catch: Capturar falhas de conexão e ativar o Modo Offline (simulação).

finally: Garantir que o estado de loading seja desativado independente do sucesso ou falha.

2. Backend: Princípio KISS (Keep It Simple, Stupid)

Tipagem Forte: Uso de TextChoices nos Models do Django para evitar "strings mágicas".

Lógica na View: A regra de negócio (if user == VIP) foi implementada diretamente na View de forma estruturada, evitando overengineering.

3. Componentização (React)

A interface foi quebrada em sub-componentes funcionais para melhor legibilidade:

<LoginScreen />: Gerencia a seleção inicial de perfil.

<MessageItem />: Renderiza os balões de mensagem individuais.

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

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


2. Instale as dependências e inicie:

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver


✅ O servidor rodará em: http://127.0.0.1:8000

Passo 2: Frontend (Cliente)

No segundo terminal:

1. Acesse a pasta e instale pacotes:

cd frontend
npm install


2. Execute o projeto:

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