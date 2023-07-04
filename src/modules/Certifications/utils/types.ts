/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationTable {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}

export interface Params {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  order: string;
  filter: Filter;
}

export interface BaseParam {
  [key: string]: string;
}

type DateBase = {
  from: string;
  to: string;
  operator: string;
  option: string;
};

export interface Pagination {
  page: number;
  sortBy: string;
  descending: boolean;
  rowsPerPage: number;
  rowsNumber: number;
}

export interface UpdateMassiveModel {
  pais_c?: string;
  priority?: string;
  status?: string;
}

export interface Certification {
  id: string;
  nro_solicitud: string;
  etapa: string;
  estado: string;
  tipo_tramite: string;
  id_solicitante: string;
  id_producto: string;
  id_tipo_producto: string;
  iddivision_c: string;
  idamercado_c: string;
  idregional_c: string;
  grupocliente_c: string;
  date_entered: string;
  cod_productos: string;
  comentario_creacion: string;
  aprobacion: string;
  id_profesional_acreditado: string;
  date_register_misa: string;
  date_aprox_cert: string;
  date_certif: string;
  observacion: string;
  comentario_observacion: string;
  id_empresa: string;
  assigned_user_id: string;
  empresa_email: string;
  empresa_phone: string;
  codigos_producto: string;
}

export interface Filter extends Partial<Certification> {
  created_by?: string[];
  modified_by?: string[];
  assigned_to?: string[];
  creation_date?: DateBase;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  fullname: string;
  iddivision_c: string;
  idregional_c: string;
  idamercado_c: string;
  id_empresa_c: string;
}
