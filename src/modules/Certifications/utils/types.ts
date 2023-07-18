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

export interface CertificationDB {
  id: string;
  name: string;
  date_entered: string;
  date_modified: string;
  modified_user_id: string;
  created_by: string;
  description: string;
  deleted: string;
  assigned_user_id: string;
  etapa_c: string;
  estado_c: string;
  tipo_tramite_c: string;
  user_id_c: string;
  iddivision_c: string;
  idamercado_c: string;
  idregional_c: string;
  producto_c: string;
  referencia_prods: string;
  cod_productos_c: string;
  tipo_producto_c: string;
  comentario_solicitud_c: string;
  estado_aprobacion_c: string;
  user_id1_c: string;
  hance_empresa_id_c: string;
  date_register_misa_c: string;
  date_planning_cert_c: string;
  cod_misa_c: string;
  nro_ruta_c: string;
  date_real_cert_c: string;
  fabricante_c: string;
  contact_fabricante_c: string;
  telefono_fabricante_c: string;
  correo_fabricante_c: string;
}

export interface Certification {
  id: string;
  name: string;
  etapa_c: string;
  estado_c: string;
  tipo_tramite_c: string;
  user_id_c: string;
  date_entered: string;
  fabricante_c:string;
  producto_c:string;
  id_producto_c:string;
  id_fabricante_c:string;
  id_contacto_fabricante_c:string;
  contacto_fabricante_c:string;
  telefono_fabricante_c:string;
  correo_fabricante_c:string;
  id_producto: string;
  iddivision_c: string;
  idamercado_c: string;
  idregional_c: string;
  id_tipo_producto: string;
  grupocliente_c: string;
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
  user_id1_c: string;
  codigos_producto: string;
  contact_id: string;
}

export interface Filter extends Partial<Certification> {
  created_by?: string[];
  modified_by?: string[];
  assigned_to?: string[];
  creation_date?: DateBase;
  fastFilter?:string;
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

export interface Manufacturer {
  id: string;
  annual_revenue: string;
  archivo_c: string;
  assigned_user_id?: string;
  billing_address_city: string;
  billing_address_country: string;
  billing_address_postalcode: string;
  billing_address_state: string;
  billing_address_street: string;
  created_by?: string;
  date_entered: string;
  date_modified: string;
  deleted?: string;
  description?: string;
  employees: string;
  hanp_proveedores_type?: string;
  idgrupo_c: string;
  idproveedor_c: string;
  industry: string;
  modified_user_id: string;
  name: string;
  nit_ci_c: string;
  ownership: string;
  phone_alternate: string;
  phone_fax: string;
  phone_office: string;
  rating: string;
  shipping_address_city: string;
  shipping_address_country: string;
  shipping_address_postalcode: string;
  shipping_address_state: string;
  shipping_address_street: string;
  ticker_symbol: string;
  website: string;
}

export interface Product {
  id: string;
  name: string;
  date_entered: string;
  date_modified: string;
  modified_user_id: string;
  created_by: string;
  description: string;
  deleted: string;
  assigned_user_id: string;
  iddivision_c: string;
  idamercado_c: string;
  idregional_c: string;
  idgrupocliente_c: string;
  marca_c: string;
  habilitar_c: string;
  descripcion_basica_html_c: string;
  caracteristicas_text_c: string;
  atributos_aux_c: string;
  img_aux_c: string;
  aos_product_categories_id_c: string;
}
