from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import Producto
from .serializers import (
    ProductoCreateSerializer,
    ProductoDetailSerializer,
    ProductoListSerializer,
)


class ProductoPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class EsVendedorOSoloLectura(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.vendedor == request.user


class ProductoListCreateView(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    pagination_class = ProductoPagination

    def get_permissions(self):
        if self.request.method == 'GET' and self.request.query_params.get('mine') == '1':
            return [permissions.IsAuthenticated()]
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductoCreateSerializer
        return ProductoListSerializer

    def get_queryset(self):
        if self.request.query_params.get('mine') == '1':
            return (
                Producto.objects.filter(vendedor=self.request.user)
                .select_related('vendedor__perfil')
                .prefetch_related('imagenes')
                .order_by('-created_at')
            )

        qs = Producto.objects.activos().select_related('vendedor__perfil').prefetch_related('imagenes')

        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(
                Q(titulo__icontains=q)
                | Q(equipo__icontains=q)
                | Q(temporada__icontains=q)
            )

        categoria = self.request.query_params.get('categoria')
        if categoria:
            qs = qs.filter(categoria=categoria)

        precio_min = self.request.query_params.get('precio_min')
        if precio_min:
            qs = qs.filter(precio__gte=precio_min)

        precio_max = self.request.query_params.get('precio_max')
        if precio_max:
            qs = qs.filter(precio__lte=precio_max)

        ordering = self.request.query_params.get('ordering')
        if ordering in ('precio', '-precio', '-created_at', 'created_at'):
            qs = qs.order_by(ordering)

        return qs


class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.select_related('vendedor__perfil').prefetch_related('imagenes')
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), EsVendedorOSoloLectura()]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return ProductoCreateSerializer
        return ProductoDetailSerializer

    def destroy(self, request, *args, **kwargs):
        producto = self.get_object()
        producto.estado = Producto.Estado.AGOTADO
        producto.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
