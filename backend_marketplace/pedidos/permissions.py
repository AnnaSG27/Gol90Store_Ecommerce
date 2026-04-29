from rest_framework.permissions import BasePermission


def _es_vendedor(user):
    if user.is_staff:
        return True
    perfil = getattr(user, 'perfil', None)
    return perfil is not None and perfil.tipo_usuario in ('freelancer', 'ambos')


class EsClienteAutenticado(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class EsVendedorOAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and _es_vendedor(request.user)


class EsAdminOStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff
