from fastapi import FastAPI, HTTPException
from app.models.user import User
from app.models.user_create import UserCreate

app = FastAPI()

# Banco de dados falso (lista em memória)
users_db = []
next_id = 1


@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}


# Listar todos os usuários
@app.get("/users")
def get_users():
    return users_db


# Buscar usuário por ID
@app.get("/users/{id}")
def get_user(id: int):
    for user in users_db:
        if user.id == id:
            return user
    raise HTTPException(status_code=404, detail="Usuário não encontrado")


# Criar usuário
@app.post("/users")
def create_user(data: UserCreate):
    global next_id
    user = User(id=next_id, name=data.name, email=data.email, password=data.password)
    users_db.append(user)
    next_id += 1
    return user


# Atualizar usuário
@app.put("/users/{id}")
def update_user(id: int, data: UserCreate):
    for index, user in enumerate(users_db):
        if user.id == id:
            users_db[index] = User(id=id, name=data.name, email=data.email, password=data.password)
            return users_db[index]
    raise HTTPException(status_code=404, detail="Usuário não encontrado")


# Deletar usuário
@app.delete("/users/{id}")
def delete_user(id: int):
    for index, user in enumerate(users_db):
        if user.id == id:
            users_db.pop(index)
            return {"mensagem": "Usuário deletado"}
    raise HTTPException(status_code=404, detail="Usuário não encontrado")