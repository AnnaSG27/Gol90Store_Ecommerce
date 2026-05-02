from django.db import transaction
from rest_framework import serializers

from .models import Experiencia, Habilidad, Perfil, Usuario


class RegistroSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    telefono = serializers.CharField(max_length=20, required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    url_portafolio = serializers.URLField(required=False, allow_blank=True)
    tipo_usuario = serializers.ChoiceField(
        choices=Perfil.TipoUsuario.choices,
        required=False,
        default=Perfil.TipoUsuario.CLIENTE,
    )

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError('Ya existe un usuario con este email.')
        return value

    @transaction.atomic
    def create(self, validated_data):
        perfil_data = {
            'telefono': validated_data.pop('telefono', ''),
            'bio': validated_data.pop('bio', ''),
            'url_portafolio': validated_data.pop('url_portafolio', ''),
            'tipo_usuario': validated_data.pop('tipo_usuario'),
        }
        usuario = Usuario.objects.create_user(**validated_data)
        Perfil.objects.create(usuario=usuario, **perfil_data)
        return usuario


class HabilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habilidad
        fields = ['id', 'nombre']


class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = [
            'id', 'empresa', 'cargo', 'descripcion',
            'fecha_inicio', 'fecha_fin', 'ubicacion',
        ]


class PerfilSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='usuario.email', read_only=True)
    first_name = serializers.CharField(source='usuario.first_name')
    last_name = serializers.CharField(source='usuario.last_name')
    nombre_completo = serializers.CharField(read_only=True)
    foto_perfil_url = serializers.SerializerMethodField()
    habilidades = HabilidadSerializer(many=True, read_only=True)
    habilidad_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Habilidad.objects.all(),
        source='habilidades',
        write_only=True,
        required=False,
    )
    experiencias = ExperienciaSerializer(many=True, read_only=True)

    class Meta:
        model = Perfil
        fields = [
            'email', 'first_name', 'last_name', 'nombre_completo',
            'telefono', 'bio', 'url_portafolio', 'tipo_usuario',
            'foto_perfil', 'foto_perfil_url',
            'habilidades', 'habilidad_ids', 'experiencias',
        ]
        extra_kwargs = {
            'foto_perfil': {'write_only': True, 'required': False},
        }

    def get_foto_perfil_url(self, obj):
        request = self.context.get('request')
        if request and obj.foto_perfil:
            return request.build_absolute_uri(obj.foto_perfil.url)
        return None

    def update(self, instance, validated_data):
        usuario_data = validated_data.pop('usuario', {})
        habilidades = validated_data.pop('habilidades', None)

        if usuario_data:
            for attr, value in usuario_data.items():
                setattr(instance.usuario, attr, value)
            instance.usuario.save()

        instance = super().update(instance, validated_data)

        if habilidades is not None:
            instance.habilidades.set(habilidades)

        return instance
