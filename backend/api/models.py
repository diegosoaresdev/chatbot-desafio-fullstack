from django.db import models
from django.utils.translation import gettext_lazy as _

class Message(models.Model):
    class UserType(models.TextChoices):
        USER_A = 'A', _('Usuário A (VIP)')
        USER_B = 'B', _('Usuário B (Padrão)')

    user_identifier = models.CharField(
        max_length=1, 
        choices=UserType.choices,
        help_text="Identificador único do tipo de usuário"
    )
    content = models.TextField(verbose_name="Mensagem do Usuário")
    response = models.TextField(verbose_name="Resposta do Sistema")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")

    class Meta:
        ordering = ['created_at']
        verbose_name = "Mensagem"
        verbose_name_plural = "Mensagens"

    def __str__(self):
        return f"[{self.get_user_identifier_display()}] {self.content[:30]}..."