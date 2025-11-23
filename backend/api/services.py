from typing import Tuple
from .models import Message

class ChatService:
    @staticmethod
    def generate_mock_response(user_id: str) -> str:
        """
        Gera uma resposta simulada baseada no perfil do usuário.
        Centraliza a regra de negócio do chatbot.
        """
        if user_id == Message.UserType.USER_A:
            return (
                "Olá, Cliente VIP! Identificamos sua prioridade. "
                "Um especialista sênior analisará sua solicitação em instantes."
            )
        elif user_id == Message.UserType.USER_B:
            return (
                "Obrigado pelo contato. Sua mensagem foi registrada em nosso sistema "
                "e será respondida por e-mail em até 48 horas úteis."
            )
        return "Perfil não reconhecido, mas registramos sua mensagem."

    @staticmethod
    def process_message(user_id: str, content: str) -> Message:
        """
        Orquestra o fluxo de receber, processar e salvar a mensagem.
        """
        response_text = ChatService.generate_mock_response(user_id)
        
        message = Message.objects.create(
            user_identifier=user_id,
            content=content,
            response=response_text
        )
        return message