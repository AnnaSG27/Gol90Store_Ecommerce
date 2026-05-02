from django.core.management.base import BaseCommand

from usuarios.demo_seed import (
    ensure_local_demo_products,
    ensure_local_demo_users,
    run_sprint2_demo_post_seed,
)


class Command(BaseCommand):
    help = (
        'Crea o actualiza cuentas y productos demo para entorno local Sprint 2. '
        'Idempotente: puede ejecutarse varias veces. Restablece contrasenas demo.'
    )

    def handle(self, *args, **options):
        seller = ensure_local_demo_users()
        created = ensure_local_demo_products(seller)
        reassigned, images = run_sprint2_demo_post_seed(seller)
        self.stdout.write(
            self.style.SUCCESS(
                f'Cuentas demo locales listas. Productos nuevos del vendedor demo: {created}. '
                f'Productos reasignados al piloto monotienda: {reassigned}. '
                f'Imagenes demo agregadas (sin duplicar): {images}.'
            )
        )
        self.stdout.write(
            'Usuarios: admin@gol90store.local, vendedor@gol90store.local, '
            'cliente@gol90store.local (ver README; solo uso local).'
        )
