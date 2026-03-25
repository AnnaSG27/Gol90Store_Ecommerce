from django.urls import path

from .views import ProductoDetailView, ProductoListCreateView

urlpatterns = [
    path('', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('<uuid:id>/', ProductoDetailView.as_view(), name='producto-detail'),
]
