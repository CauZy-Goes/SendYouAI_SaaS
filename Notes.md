# SendYouAI — Notas de Desenvolvimento

---

## 1. Ambiente Virtual

```powershell
python -m venv .venv                                         # cria o ambiente virtual
.venv\Scripts\Activate.ps1                                   # ativa o ambiente
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser          # libera execução de scripts (se der erro)
```

---

## 2. Dependências

```powershell
pip install fastapi uvicorn                          # API e servidor
pip install sqlalchemy psycopg2-binary python-dotenv # banco de dados
pip install passlib==1.7.4 bcrypt==4.0.1             # hash de senha
pip freeze > requirements.txt                        # salva dependências
pip install -r requirements.txt                      # instala dependências salvas
```

---

## 3. Rodar a API

```powershell
uvicorn app.main:app --reload   # sobe a API com reload automático
```

- `http://localhost:8000` → API
- `http://localhost:8000/docs` → Swagger (testar rotas)

---

## 4. Docker

```powershell
docker compose up -d      # sobe os containers em background
docker compose down       # derruba os containers
docker compose down -v    # derruba e apaga o banco (recria do zero)
docker ps                 # lista containers rodando
docker logs <container>   # ver logs de um container
wsl --shutdown            # desliga o WSL
```

**Portas:**

- `5432` → PostgreSQL
- `8081` → PgAdmin (`admin@admin.com` / `admin123`)
- `8082` → Evolution API

**Banco:**

- Host interno (Docker): `postgres`
- Host externo: `localhost`
- Usuário: `admin` | Senha: `admin123` | Banco: `sendyouai`

---

## 5. Git

```powershell
git remote set-url origin <url>                              # troca o remote
git remote -v                                                # verifica o remote
git push -u origin main                                      # primeiro push
git commit --amend -m "mensagem"                             # renomeia último commit
git push --force origin main                                 # força push após amend
python -c "import secrets; print(secrets.token_hex(32))"    # gera chave segura
```

---

## 6. Evolution API

### Verificar se está no ar

```http
GET http://localhost:8082
Headers: apikey: <sua-chave>
```

### Criar instância do WhatsApp

```http
POST http://localhost:8082/instance/create
Headers: apikey: <sua-chave>
Body:
{
  "instanceName": "sendyouai",
  "qrcode": true,
  "integration": "WHATSAPP-BAILEYS"
}
```

### Gerar QR Code para escanear

```http
GET http://localhost:8082/instance/connect/sendyouai
Headers: apikey: <sua-chave>
```

Ou acesse pelo manager: `http://localhost:8082/manager`

### Listar instâncias

```http
GET http://localhost:8082/instance/fetchInstances
Headers: apikey: <sua-chave>
```

### Deletar instância

```http
DELETE http://localhost:8082/instance/delete/sendyouai
Headers: apikey: <sua-chave>
```

### Configurar Webhook

```http
POST http://localhost:8082/webhook/set/sendyouai
Headers: apikey: <sua-chave>
Body:
{
  "webhook": {
    "enabled": true,
    "url": "http://localhost:8000/webhook/whatsapp",
    "webhook_by_events": false,
    "webhook_base64": false,
    "events": ["MESSAGES_UPSERT"]
  }
}
```

---

## 7. Estrutura do Projeto

```
SendYouAI/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── services/
│   ├── sql/
│   ├── pgadmin/
│   ├── .env
│   └── docker-compose.yml
└── frontend/
    └── app/
```
