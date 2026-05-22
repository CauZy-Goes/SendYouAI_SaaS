# SendYouAI — Notas de Desenvolvimento

---

## 1. Ambiente Virtual

```powershell
# Criar o ambiente virtual
python -m venv .venv

# Ativar o ambiente virtual
.venv\Scripts\Activate.ps1

# Se der erro de permissão
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 2. Instalar Dependências

```powershell
# FastAPI e servidor
pip install fastapi uvicorn

# Banco de dados
pip install sqlalchemy psycopg2-binary python-dotenv
```

---

## 3. Rodar a API

```powershell
uvicorn main:app --reload
```

- `main` → nome do arquivo `main.py`
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
```

---

## 5. Docker — PostgreSQL + PgAdmin

```powershell
# Subir os containers
docker compose up -d
```

**Acesso ao PgAdmin:**
- URL: `http://localhost:8080`
- Email: `admin@admin.com`
- Senha: `admin123`

**Conectar PgAdmin ao Postgres:**
- Host: `postgres`
- Port: `5432`
- Database: `sendyouai`
- Username: `admin`
- Password: `admin123`

**Credenciais do banco:**
```
Host:     localhost
Porta:    5432
Banco:    sendyouai
Usuário:  admin
Senha:    admin123
```

---

## 6. Estrutura do Projeto

```
SendYouAI/
├── .venv/
├── .env
├── .gitignore
├── docker-compose.yml
├── requirements.txt
└── app/
    ├── __init__.py
    ├── main.py
    ├── database.py
    ├── models/
    ├── schemas/
    ├── routers/
    └── services/
```

---


```

