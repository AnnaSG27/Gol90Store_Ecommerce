from django.urls import path

from .views import (
    ExperienciaDetailView,
    ExperienciaListCreateView,
    HabilidadListView,
    PerfilView,
    RegistroView,
)

urlpatterns = [
    path('registro/', RegistroView.as_view(), name='registro'),
    path('perfil/', PerfilView.as_view(), name='perfil'),
    path('habilidades/', HabilidadListView.as_view(), name='habilidades'),
    path('experiencias/', ExperienciaListCreateView.as_view(), name='experiencias'),
    path('experiencias/<uuid:pk>/', ExperienciaDetailView.as_view(), name='experiencia-detail'),
]
