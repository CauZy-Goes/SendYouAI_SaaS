# SendYouAI — Notas de Desenvolvimento

---

## 1. Ambiente Virtual

```powershell
# Criar o ambiente virtual
python -m venv .venv

# Ativar o ambiente virtual
.venv\Scripts\Activate

# Se der erro de permissão
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 2. Instalar Dependências

````powershell
# FastAPI e servidor
pip install fastapi uvicorn

pip install passlib bcrypt

# Banco de dados
pip install sqlalchemy psycopg2-binary python-dotenv passlib bcrypt

O que cada dependência faz
fastapi — o framework web para criar a API

uvicorn — servidor que roda a API

passlib — biblioteca de hashing de senhas, suporta vários algoritmos

bcrypt — algoritmo de hash usado pelo passlib para proteger senhas

sqlalchemy — ORM que transforma classes Python em tabelas do banco

psycopg2-binary — driver que conecta ao PostgreSQL

python-dotenv — lê variáveis do arquivo .env

requirements.txt
Gerar — captura todas as dependências instaladas no ambiente:


pip freeze > requirements.txt
Instalar — instala tudo que está no arquivo (útil quando alguém clona o projeto):

pip install -r requirements.txt
O requirements.txt gerado vai ficar assim:

fastapi
uvicorn
passlib
bcrypt
sqlalchemy
psycopg2-binary
python-dotenv
Sempre rode o pip freeze > requirements.txt depois de instalar uma dependência nova para manter o arquivo atualizado. ✅

## 3. Rodar a API

```powershell
uvicorn app.main:app --reload
````

- `app.main` → pasta `app/` arquivo `main.py`
- `app` → nome da variável FastAPI
- `--reload` → reinicia ao salvar alterações

**URLs disponíveis:**

- `http://localhost:8000` → API
- `http://localhost:8000/docs` → documentação interativa

---

## 4. Git

```powershell
# Trocar remote de SSH para HTTPS
git remote set-url origin https://github.com/CauZy-Goes/SendYouAI_SaaS.git

# Verificar remote
git remote -v

# Subir código
git push -u origin main

# Renomear último commit
git commit --amend -m "feat: descrição do commit"
git push --force origin main
```

---

## 5. Docker — PostgreSQL + PgAdmin

```powershell
# Subir os containers O  -d significa detached — roda os containers em background, liberando o terminal.
docker compose up -d

# Derrubar os containers O -v significa volumes — ele apaga o volume postgres_data junto com os containers.
docker compose down

# Derrubar e apagar volume (recriar banco do zero)
docker compose down -v
docker compose up -d

# Desligar WSL
wsl --shutdown
```

**Acesso ao PgAdmin:**

- URL: `http://localhost:8080`
- Email: `admin@admin.com`
- Senha: `admin123`

**Credenciais do banco:**

```
Host:     postgres  (dentro do Docker)
Host:     localhost (fora do Docker)
Porta:    5432
Banco:    sendyouai
Usuário:  admin
Senha:    admin123
```

---

## 6. Estrutura do Projeto

```
SendYouAI/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── services/
│   ├── sql/
│   │   └── init.sql
│   ├── pgadmin/
│   │   └── servers.json
│   ├── .env
│   └── docker-compose.yml
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── notes.md
```

---

## 7. Frontend — Next.js

```powershell
# Criar o projeto Next.js
npx create-next-app@latest frontend ou npx create-next-app@latest .
```

**Opções recomendadas:**

```
TypeScript?         Yes
ESLint?             Yes
Tailwind CSS?       Yes
src/ directory?     Yes
App Router?         Yes
Import alias?       No
```

```powershell
# Entrar na pasta e rodar
cd frontend
npm run dev
```

**URL disponível:**

- `http://localhost:3000` → Frontend

---
