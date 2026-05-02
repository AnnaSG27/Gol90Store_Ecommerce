from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Experiencia, Habilidad, Perfil, Usuario


class PerfilInline(admin.StackedInline):
    model = Perfil
    can_delete = False
    extra = 0
    filter_horizontal = ('habilidades',)
    fieldsets = (
        (None, {
            'fields': ('tipo_usuario', 'telefono', 'bio', 'url_portafolio', 'foto_perfil', 'habilidades'),
        }),
    )


@admin.register(Usuario)
class UsuarioAdmin(BaseUserAdmin):
    ordering = ('email',)
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    inlines = (PerfilInline,)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {'fields': ('first_name', 'last_name')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'tipo_usuario', 'telefono')
    list_filter = ('tipo_usuario',)
    search_fields = ('usuario__email', 'usuario__first_name', 'usuario__last_name')
    filter_horizontal = ('habilidades',)
    raw_id_fields = ('usuario',)


@admin.register(Habilidad)
class HabilidadAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)


@admin.register(Experiencia)
class ExperienciaAdmin(admin.ModelAdmin):
    list_display = ('cargo', 'empresa', 'fecha_inicio', 'fecha_fin', 'get_perfil')
    list_filter = ('fecha_inicio',)
    search_fields = ('cargo', 'empresa', 'perfil__usuario__email')
    raw_id_fields = ('perfil',)

    @admin.display(description='Perfil')
    def get_perfil(self, obj):
        return obj.perfil.nombre_completo
