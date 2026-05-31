export interface Viatico {
  id?: number;
  usuario_id: number;
  vehiculo_id?: number;
  fecha?: Date;
  destino: string;
  motivo?: string;
  monto: number;
  estado?: 'pendiente' | 'aprobado' | 'rechazado';
}