from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from .models import Message
from .serializers import MessageSerializer
from .services import ChatService
import logging

# Configuração de log para monitorar erros sem parar a aplicação
logger = logging.getLogger(__name__)

class ChatView(APIView):
    """
    API endpoint para listar histórico e enviar novas mensagens.
    """

    def get(self, request: Request) -> Response:
        """
        Retorna o histórico de mensagens de um usuário específico.
        """
        user_id = request.query_params.get('user_identifier')
        
        if not user_id:
            return Response(
                {"error": "O parâmetro 'user_identifier' é obrigatório na URL."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Busca otimizada no banco de dados
        messages = Message.objects.filter(user_identifier=user_id).order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:
        """
        Recebe uma nova mensagem e processa a resposta automática.
        """
        user_id = request.data.get('user_identifier')
        content = request.data.get('content')

        # Validação básica de entrada
        if not user_id or not content:
            return Response(
                {"error": "Os campos 'user_identifier' e 'content' são obrigatórios."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Delega a lógica pesada para o Service
            message = ChatService.process_message(user_id=user_id, content=content)
            serializer = MessageSerializer(message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            logger.error(f"Erro ao processar mensagem: {str(e)}")
            return Response(
                {"error": "Ocorreu um erro interno ao processar sua mensagem."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )