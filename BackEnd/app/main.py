from fastapi import FastAPI
from app.database import engine, Base
from app.routers import user_router

# Cria as tabelas no banco ao iniciar
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SendYouAI API")

# Registra os routers
app.include_router(user_router.router)


@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}