from rest_framework import status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Experiencia, Habilidad, Perfil
from .serializers import (
    ExperienciaSerializer,
    HabilidadSerializer,
    PerfilSerializer,
    RegistroSerializer,
)


def get_or_create_profile(user):
    perfil, _ = Perfil.objects.get_or_create(
        usuario=user,
        defaults={'tipo_usuario': Perfil.TipoUsuario.CLIENTE},
    )
    return perfil


class RegistroView(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'mensaje': 'Usuario creado exitosamente.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PerfilView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        perfil = get_or_create_profile(request.user)
        serializer = PerfilSerializer(
            perfil, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request):
        perfil = get_or_create_profile(request.user)
        serializer = PerfilSerializer(
            perfil,
            data=request.data,
            partial=True,
            context={'request': request},
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HabilidadListView(APIView):
    def get(self, request):
        habilidades = Habilidad.objects.all()
        serializer = HabilidadSerializer(habilidades, many=True)
        return Response(serializer.data)


class ExperienciaListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        perfil = get_or_create_profile(request.user)
        experiencias = perfil.experiencias.all()
        serializer = ExperienciaSerializer(experiencias, many=True)
        return Response(serializer.data)

    def post(self, request):
        perfil = get_or_create_profile(request.user)
        serializer = ExperienciaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(perfil=perfil)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExperienciaDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        perfil = get_or_create_profile(user)
        return Experiencia.objects.get(pk=pk, perfil=perfil)

    def put(self, request, pk):
        try:
            experiencia = self.get_object(pk, request.user)
        except Experiencia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ExperienciaSerializer(
            experiencia, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            experiencia = self.get_object(pk, request.user)
        except Experiencia.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        experiencia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
