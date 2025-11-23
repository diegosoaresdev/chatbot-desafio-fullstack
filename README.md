💬 Chatbot de Atendimento Simulado

Solução Full Stack desenvolvida para simular um sistema de atendimento inteligente. O projeto demonstra a integração entre um backend robusto em Django e um frontend interativo em React, focando em qualidade de código, organização de arquitetura e experiência do utilizador.

🛠️ Tecnologias e Ferramentas

Backend (API)

Python 3.10+: Linguagem base.

Django & Django REST Framework: Framework para construção de uma API RESTful segura e escalável.

SQLite: Banco de dados relacional.

Django CORS Headers: Gerenciamento de segurança entre origens.

Frontend (Interface)

React.js: Biblioteca para construção de interfaces.

Axios: Cliente HTTP para comunicação com a API.

Tailwind CSS: Estilização rápida e responsiva.

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação. Você precisará de dois terminais abertos.

Pré-requisitos

Python instalado.

Node.js e NPM instalados.

Git instalado.

Passo 1: Configurar o Backend (Servidor)

No primeiro terminal:

1. Acesse a pasta do backend:

cd backend


2. Crie e ative o ambiente virtual:

No Windows:

python -m venv venv
venv\Scripts\activate


No Linux/Mac:

python3 -m venv venv
source venv/bin/activate


3. Instale as dependências:

pip install django djangorestframework django-cors-headers


4. Inicie o servidor:

python manage.py migrate
python manage.py runserver


✅ O servidor estará rodando em: http://127.0.0.1:8000

Passo 2: Configurar o Frontend (Cliente)

No segundo terminal:

1. Acesse a pasta do frontend:

cd frontend


2. Instale as dependências:

npm install


3. Inicie a aplicação:

npm start


✅ Acesse no navegador: http://localhost:3000

🧠 Decisões Técnicas

1. Arquitetura Desacoplada

Separei a aplicação em duas camadas (Client-Server). Isso simula um ambiente real, facilita testes e permite escalabilidade futura.

2. Backend (KISS Principle)

Tipagem Forte: Uso de TextChoices no Django para evitar "strings mágicas" e erros de digitação.

Lógica na View: Regra de negócio implementada diretamente na View de forma estruturada, evitando complexidade desnecessária para um MVP.

3. Frontend (UX e Componentização)

Componentes: Interface quebrada em LoginScreen e MessageItem para melhor legibilidade.

Resiliência: Implementação de um "Modo Offline" que simula respostas caso o backend caia, garantindo que a interface nunca quebre.

4. Banco de Dados

Uso do SQLite pela portabilidade, permitindo rodar o projeto sem configurações complexas de ambiente.

📡 Documentação da API

Base URL: http://127.0.0.1:8000/api

Método

Rota

Descrição

Exemplo

GET

/chat/

Busca histórico.

?user_identifier=A

POST

/chat/

Envia mensagem.

{ "user_identifier": "A", "content": "Olá" }