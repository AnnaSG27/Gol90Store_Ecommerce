from .models import Pago, Pedido


class ProveedorPagoSimulado:
    def cobrar(self, pedido: Pedido, rechazar: bool = False) -> dict[str, str]:
        estado = Pago.Estado.RECHAZADO if rechazar else Pago.Estado.APROBADO
        return {
            'estado': estado,
            'referencia': f'SIM-{pedido.id}',
        }
