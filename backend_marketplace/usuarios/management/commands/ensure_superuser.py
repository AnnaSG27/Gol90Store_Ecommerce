import getpass

from django.core.management.base import BaseCommand

from usuarios.models import Usuario


class Command(BaseCommand):
    help = 'Ensures a user has superuser privileges. Creates the user if it does not exist.'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email of the superuser')

    def handle(self, *args, **options):
        email = options['email']

        try:
            user = Usuario.objects.get(email=email)
            changed = False
            if not user.is_staff:
                user.is_staff = True
                changed = True
            if not user.is_superuser:
                user.is_superuser = True
                changed = True
            if changed:
                user.save(update_fields=['is_staff', 'is_superuser'])
                self.stdout.write(self.style.SUCCESS(f'Usuario "{email}" promovido a superusuario.'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Usuario "{email}" ya es superusuario.'))
        except Usuario.DoesNotExist:
            self.stdout.write(f'Usuario "{email}" no existe. Se creará uno nuevo.')
            password = getpass.getpass('Ingrese password: ')
            password_confirm = getpass.getpass('Confirme password: ')
            if password != password_confirm:
                self.stderr.write(self.style.ERROR('Las contraseñas no coinciden.'))
                return
            Usuario.objects.create_superuser(email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superusuario "{email}" creado exitosamente.'))
