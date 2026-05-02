from django.urls import path

from .views import (
    MisPedidosView,
    PedidoCreateView,
    PedidoDetailView,
    PedidoEstadoUpdateView,
    PedidosVendedorView,
)

urlpatterns = [
    path('', PedidoCreateView.as_view(), name='pedido-create'),
    path('checkout/', PedidoCreateView.as_view(), name='pedido-checkout'),
    path('mis-pedidos/', MisPedidosView.as_view(), name='mis-pedidos'),
    path('vendedor/', PedidosVendedorView.as_view(), name='pedidos-vendedor'),
    path('<uuid:id>/', PedidoDetailView.as_view(), name='pedido-detail'),
    path('<uuid:id>/estado/', PedidoEstadoUpdateView.as_view(), name='pedido-estado'),
]
