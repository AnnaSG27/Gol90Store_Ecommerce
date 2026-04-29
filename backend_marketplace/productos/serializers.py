from rest_framework import serializers

from .models import ImagenProducto, Producto


class VendedorResumenSerializer(serializers.Serializer):
    nombre_completo = serializers.SerializerMethodField()
    iniciales = serializers.SerializerMethodField()

    def get_nombre_completo(self, obj):
        perfil = getattr(obj, 'perfil', None)
        if perfil and perfil.nombre_completo:
            return perfil.nombre_completo
        full_name = f'{obj.first_name} {obj.last_name}'.strip()
        return full_name or obj.email

    def get_iniciales(self, obj):
        f = obj.first_name[:1] if obj.first_name else ''
        ln = obj.last_name[:1] if obj.last_name else ''
        initials = f'{f}{ln}'.upper()
        if initials:
            return initials
        return obj.email[:2].upper()


class VendedorDetalleSerializer(VendedorResumenSerializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    bio = serializers.SerializerMethodField()
    tipo_usuario = serializers.SerializerMethodField()

    def get_bio(self, obj):
        perfil = getattr(obj, 'perfil', None)
        return perfil.bio if perfil else ''

    def get_tipo_usuario(self, obj):
        perfil = getattr(obj, 'perfil', None)
        return perfil.tipo_usuario if perfil else ''


class ImagenProductoSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ImagenProducto
        fields = ['id', 'url', 'orden']

    def get_url(self, obj):
        request = self.context.get('request')
        if request and obj.imagen:
            return request.build_absolute_uri(obj.imagen.url)
        return ''


class ProductoListSerializer(serializers.ModelSerializer):
    vendedor = VendedorResumenSerializer(read_only=True)
    imagenes = ImagenProductoSerializer(many=True, read_only=True)
    imagen_principal_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id', 'titulo', 'equipo', 'temporada', 'categoria',
            'precio', 'tallas_disponibles', 'stock', 'estado',
            'imagen_principal_url',
            'vendedor', 'imagenes', 'created_at',
        ]

    def get_imagen_principal_url(self, obj):
        imagen = obj.imagen_principal
        if not imagen:
            return None
        return ImagenProductoSerializer(imagen, context=self.context).data['url']


class ProductoDetailSerializer(serializers.ModelSerializer):
    vendedor = VendedorDetalleSerializer(read_only=True)
    imagenes = ImagenProductoSerializer(many=True, read_only=True)
    imagen_principal_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id', 'titulo', 'equipo', 'temporada', 'descripcion',
            'categoria', 'precio', 'tallas_disponibles', 'stock',
            'estado', 'imagen_principal_url',
            'vendedor', 'imagenes', 'created_at', 'updated_at',
        ]

    def get_imagen_principal_url(self, obj):
        imagen = obj.imagen_principal
        if not imagen:
            return None
        return ImagenProductoSerializer(imagen, context=self.context).data['url']


class ProductoCreateSerializer(serializers.ModelSerializer):
    imagenes = serializers.ListField(
        child=serializers.ImageField(),
        max_length=3,
        required=False,
        write_only=True,
    )
    tallas_disponibles = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list,
    )

    class Meta:
        model = Producto
        fields = [
            'id', 'titulo', 'equipo', 'temporada', 'descripcion',
            'categoria', 'precio', 'tallas_disponibles', 'stock',
            'estado', 'imagenes',
        ]
        read_only_fields = ['id']

    def validate_tallas_disponibles(self, value):
        if len(value) != len(set(value)):
            raise serializers.ValidationError('Las tallas disponibles no pueden repetirse.')
        return value

    def create(self, validated_data):
        imagenes = validated_data.pop('imagenes', [])
        validated_data['vendedor'] = self.context['request'].user
        producto = super().create(validated_data)

        for i, img in enumerate(imagenes[:3]):
            ImagenProducto.objects.create(
                producto=producto,
                imagen=img,
                orden=i,
            )

        return producto
