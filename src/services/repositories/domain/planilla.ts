export interface Planilla {
  id?: number;
  fecha?: Date;
  periodo: string;
  total?: number;
}

export interface DetallePlanilla {
  id?: number;
  planilla_id: number;
  vendedor_id: number;
  salario_base: number;
  comisiones?: number;
  total?: number;
}