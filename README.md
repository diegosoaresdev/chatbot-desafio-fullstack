# 💬 Chatbot de Atendimento Simulado

Solução Full Stack desenvolvida para simular um sistema de atendimento inteligente.  
O projeto demonstra a integração entre um backend robusto em **Django** e um frontend interativo em **React**, focando em:

- Boas práticas de código (Clean Code)
- Arquitetura desacoplada
- Experiência do usuário (UX)

---

### 🔐 Nota de Segurança

A `SECRET_KEY` foi mantida no `settings.py` **intencionalmente** para facilitar a execução e avaliação local do projeto.  
Em ambientes de produção, chaves sensíveis devem ser gerenciadas via variáveis de ambiente (`.env`).

---

## 🚀 Demonstração
OBS: Observe que a API (Django) salvou as mensagens que foram enviadas anteriormente no banco de dados, vinculando-a corretamente ao usuário que a enviou! 

![Design sem nome](https://github.com/user-attachments/assets/dafbbe20-7bfa-4ebe-b913-2bce44724644)


---

## ✨ Features (Funcionalidades)

- **Login Simulado**  
Alternância entre perfis (Usuário A e Usuário B) via renderização condicional, sem autenticação real.

- **Feedback Visual & Resiliência**  
Interface reativa com indicadores de carregamento e **Modo Offline automático** caso a API falhe.

- **Histórico Persistente**  
Mensagens salvas em SQLite e recuperadas via requisições GET, garantindo integridade dos dados.

- **Lógica de Resposta Dinâmica**  
O backend interpreta o identificador do usuário e gera respostas personalizadas (VIP vs Padrão).

---

## 🛠 Tecnologias Utilizadas

### Backend (API)

- Python 3.10+
- Django
- Django REST Framework
- SQLite
- Django CORS Headers

### Frontend (Interface)

- React.js (Componentização funcional)
- Axios (Consumo da API)
- Tailwind CSS (Design moderno e responsivo)

---

## 🧠 Decisões Técnicas e Arquitetura

### 1️⃣ Estrutura de Dados e Models (Django)

Uso de `TextChoices` para o campo `user_identifier`.

**Por quê?**  
Evita “strings mágicas”, centraliza regras e facilita manutenção futura.

---

### 2️⃣ Gerenciamento de Estado (React)

Somente `useState` e `useEffect` foram utilizados.

**Por quê?**  
Para o escopo do projeto, Redux seria overengineering.  
O estado local atende bem ao fluxo de mensagens e usuário atual.

---

### 3️⃣ Lógica de Negócio (Backend)

A regra “Se VIP → responda X” foi implementada diretamente na View.

**Por quê?**  
Para um MVP, isso reduz a complexidade e facilita a leitura completa do fluxo de dados.

---

### 4️⃣ Componentização (Frontend)

Componentes como `LoginScreen` e `MessageItem` foram criados.

**Por quê?**  
Seguem princípio de responsabilidade única, mantendo `App.js` mais limpo e focado na integração com a API.

---

## 🚀 Como Executar o Projeto

### 🔎 Pré-requisitos

Certifique-se de ter instalado:

- Python
- Node.js
- Git

---

## ▶ Passo 1: Backend (Servidor)

No primeiro terminal:

```bash
cd backend
python -m venv venv
```

Ativação do ambiente virtual:

Windows
```venv\Scripts\activate```

Linux / Mac
```source venv/bin/activate```

Instale as dependências e execute o servidor:
```
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

✔ Servidor rodando em:
http://127.0.0.1:8000

---

## ▶ Passo 2: Frontend (Cliente)

No segundo terminal:
```cd frontend```

Instalação e execução:
```
npm install
npm start
```

✔ Acesse no navegador:
http://localhost:3000

---

## 📡 Documentação da API

Base URL:
http://127.0.0.1:8000/api

📜 Rotas
Método	Rota	Descrição	Payload / Params
GET	/chat/	Busca histórico	user_identifier=A
POST	/chat/	Envia mensagem nova	{ "user_identifier": "A", "content": "Texto" }

✨ Projeto ideal para demonstração de fluxo completo de comunicação entre cliente e servidor, boas práticas e experiência simulada de atendimento inteligente.
