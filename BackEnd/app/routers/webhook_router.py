from fastapi import APIRouter

router = APIRouter(prefix="/webhook", tags=["Webhook"])


@router.post("/whatsapp")
def whatsapp_webhook(payload: dict):
    # Extrai os dados da mensagem
    try:
        event = payload.get("event", "")
        data = payload.get("data", {})

        # Ignora eventos que não são mensagens
        if event != "messages.upsert":
            return {"status": "ignored"}

        message = data.get("message", {})
        key = data.get("key", {})

        # Ignora mensagens enviadas pelo próprio bot
        if key.get("fromMe"):
            return {"status": "ignored"}

        numero = key.get("remoteJid", "")
        texto = message.get("conversation", "") or message.get("extendedTextMessage", {}).get("text", "")

        print(f"Mensagem recebida de {numero}: {texto}")

        # TODO: chamar o ChatGPT aqui

        return {"status": "ok", "numero": numero, "mensagem": texto}

    except Exception as e:
        print(f"Erro no webhook: {e}")
        return {"status": "error", "detail": str(e)}