from fastapi import FastAPI
 
app = FastAPI()
 
 
@app.get("/")
def root():
    return {"mensagem": "API funcionando!"}
 
 
@app.get("/ola/{nome}")
def ola(nome: str):
    return {"mensagem": f"Olá, {nome}!"}
 
 
@app.get("/soma")
def soma(a: int, b: int):
    return {"resultado": a + b}