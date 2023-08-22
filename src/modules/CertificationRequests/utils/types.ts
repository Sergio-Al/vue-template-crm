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
    assigned_user_id: string;
    cod_misa_c: string;
    cod_productos_c: string;
    comentario_solicitud_c: string;
    contact_fabricante_c: string;
    correo_fabricante_c: string;
    created_by: string;
    date_entered: string;
    date_modified: string;
    date_planning_cert_c: string;
    date_real_cert_c: string;
    date_register_misa_c: string;
    deleted: string;
    description: string;
    estado_aprobacion_c: string;
    estado_c: string;
    etapa_c: string;
    fabricante_c: string;
    hance_empresa_id_c: string;
    idamercado_c: string;
    iddivision_c: string;
    idregional_c: string;
    modified_user_id: string;
    name: string;
    nro_ruta_c: string;
    producto_c: string;
    referencia_prods: string;
    telefono_fabricante_c: string;
    tipo_producto_c: string;
    tipo_tramite_c: string;
    user_id_c: string; //solicitante
    user_id1_c: string; //profesional acreditado
  }
  
  export interface Certification {
    id: string;
    name: string;
    etapa_c: string;
    estado_c: string;
    tipo_tramite_c: string;
    user_id_c: string;
    date_entered: string;
    fabricante_c: string;
    producto_c: string;
    id_producto_c: string;
    id_fabricante_c: string;
    id_contacto_fabricante_c: string;
    contacto_fabricante_c: string;
    telefono_fabricante_c: string;
    correo_fabricante_c: string;
    id_producto: string;
    iddivision_c: any;
    idamercado_c: any;
    idregional_c: any;
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
    assigned_user_id: string;
  }
  
  export interface Filter extends Partial<Certification> {
    name?:string;
    solicitante?:string;
    producto_c?:string;
    fabricante_c?:string;
    iddivision_c?:string;
    created_by?: string[];
    modified_by?: string[];
    assigned_to?: string[];
    creation_date?: DateBase;
    fastFilter?: string;
  }
  
  export interface User {
    id: string;
    fullname: string;
    first_name?: string;
    last_name?: string;
    iddivision_c?: string;
    idregional_c?: string;
    idamercado_c?: string;
    id_empresa_c?: string;
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
    email1: string;
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
    direccion: string;
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
  
  export interface CertificationRequest {
    assigned_user_id: string;
    assigned_user_link: string;
    assigned_user_name: string;
    cod_misa_c: string;
    cod_productos_c: string;
    comentario_solicitud_c: string;
    contact_fabricante_c: string;
    correo_fabricante_c: string;
    created_by: string;
    created_by_link: string;
    created_by_name: string;
    date_entered: string;
    date_modified: string;
    date_planning_cert_c: string;
    date_real_cert_c: string;
    date_register_misa_c: string;
    deleted: number;
    description: string;
    estado_aprobacion_c: string;
    estado_c: string;
    etapa_c: string;
    fabricante_c: string;
    id_fabricante_c:string;
    hance_certificacion_id_c: string;
    hance_solicitudcertificacion_id_c: string;
    hance_empresa_id_c: string;
    id: string;
    id_empresa_c: string;
    id_profesional_acreditado_c: string;
    id_user_solicitante_c: string;
    idamercado_c: string;
    iddivision_c: string;
    idregional_c: string;
    modified_by_name: string;
    modified_user_id: string;
    modified_user_link: string;
    name: string;
    nro_ruta_c: string;
    producto_c: string;
    referencia_prods: string;
    user_id?: string;
    user_id_c?: string;
  }
  
  export interface CertificationTable {
    name: string;
    user_id_c: string;
    date_entered_c: string;
    hance_empresa_id_c: string;
    _razon_social: string;
    _direccion_participacion: string;
    _resolucion_ministerial: string;
    user_id1_c: string;
    _nro_de_matricula: string;
    tipo_tramite_c: string;
    tipo_producto_c: string;
    hance_proveedor_id_c: string;
    _pais: string;
    _telefono: string;
    _correo: string;
    _direccion_fabricante: string;
    hance_solicitud_id_c: string;
    assigned_user_id: string;
  }
  
  export interface CertificationModel {
    name: string;
    user_id_c: string;
    date_entered_c: string;
    hance_empresa_id_c: string;
    participacion_como: {
      id: string;
      razon_social: string;
      direccion_participacion: string;
      resolucion_ministerial: string;
    };
    user_id1_c: string;
    profesional_acreditado: {
      id: string;
      name: string;
      nro_de_matricula: string;
    };
    tipo_tramite_c: string;
    tipo_producto_c: string;
    producto_id_c: string;
    producto: {
      id: string;
      name: string;
    };
    hance_proveedor_id_c: string;
    fabricante: {
      id: string;
      name: string;
      pais: string;
      telefono: string;
      correo: string;
      direccion_fabricante: string;
    };
    hance_solicitud_id_c: string;
    assigned_user_id: string;
    etapa_c: string;
    estado_c: string;
    date_modified: string;
  }
  
  export interface EmpresaParticipacion {
    id: string;
    name: string; // a company name
    razon_social_c: string;
    direccion_c: string;
    resolucion_ministerial_c: string;
    fecha_resolucion?:string;
    titular?:string;
    resolucion_ministerial_date_c?:string;
  }
  
  export interface CertificacionBody {
    id?: string;
    assigned_user_id: string; // profesional acreditado
    billing_address_street?: string;
    billing_address_country?: string;
    cod_misa_c?: string;
    date_entered: string;
    date_planning_cert_c?: string;
    date_real_cert_c?: string;
    date_register_misa_c?: string;
    email1?: string;
    estado_c?: string;
    etapa_c?: string;
    hance_empresa_id_c: string; // participacion como
    hanp_proveedores_id_c?: string; // fabricante
    hance_solicitudcertificacion_id_c?: string; //
    idamercado_c: string;
    iddivision_c: string;
    idgrupocliente_c?: string;
    idregional_c: string;
    licence?: string;
    name: string;
    nro_cert_c?: string;
    nro_ruta_c?: string;
    tipo_producto_c?: string;
    tipo_tramite_c?: string;
    phone_office?: string;
    user_id_c?: any; // SOLICITANTE
    user_idl_c?: string;
    solicitante?:string;
  }
  