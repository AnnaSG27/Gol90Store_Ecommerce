from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Pedido
from .permissions import EsClienteAutenticado, EsVendedorOAdmin
from .serializers import PedidoCreateSerializer, PedidoDetailSerializer, PedidoEstadoSerializer


class PedidoCreateView(APIView):
    permission_classes = [EsClienteAutenticado]

    def post(self, request):
        serializer = PedidoCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            pedido = serializer.save()
            return Response(PedidoDetailSerializer(pedido).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MisPedidosView(APIView):
    permission_classes = [EsClienteAutenticado]

    def get(self, request):
        pedidos = (
            Pedido.objects.filter(cliente=request.user)
            .prefetch_related('items__producto')
            .order_by('-created_at')
        )
        return Response(PedidoDetailSerializer(pedidos, many=True).data)


class PedidosVendedorView(APIView):
    permission_classes = [EsVendedorOAdmin]

    def get(self, request):
        if request.user.is_staff:
            pedidos = Pedido.objects.all().prefetch_related('items__producto').select_related('cliente')
        else:
            pedidos = (
                Pedido.objects.filter(items__producto__vendedor=request.user)
                .distinct()
                .prefetch_related('items__producto')
                .select_related('cliente')
            )
        return Response(PedidoDetailSerializer(pedidos, many=True).data)


class PedidoEstadoUpdateView(APIView):
    permission_classes = [EsVendedorOAdmin]

    def patch(self, request, id):
        pedido = get_object_or_404(Pedido, pk=id)

        if not request.user.is_staff:
            tiene_producto = pedido.items.filter(producto__vendedor=request.user).exists()
            if not tiene_producto:
                return Response(
                    {'detail': 'No tienes permiso para actualizar este pedido.'},
                    status=status.HTTP_403_FORBIDDEN,
                )

        serializer = PedidoEstadoSerializer(
            data=request.data, context={'pedido': pedido}
        )
        if serializer.is_valid():
            pedido.estado = serializer.validated_data['estado']
            pedido.actualizado_por = request.user
            pedido.save(update_fields=['estado', 'actualizado_por', 'updated_at'])
            return Response(PedidoDetailSerializer(pedido).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PedidoDetailView(APIView):
    permission_classes = [EsClienteAutenticado]

    def get(self, request, id):
        pedido = get_object_or_404(Pedido.objects.prefetch_related('items__producto'), pk=id)
        if pedido.cliente != request.user and not request.user.is_staff:
            return Response(
                {'detail': 'No tienes permiso para ver este pedido.'},
                status=status.HTTP_403_FORBIDDEN,
            )
        return Response(PedidoDetailSerializer(pedido).data)
