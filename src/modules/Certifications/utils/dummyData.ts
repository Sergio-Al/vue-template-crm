import { Certification, Manufacturer, Product } from './types';

export const amercado = [
  {
    id: '1',
    value: '02_A',
    label: 'Area de mercado 1',
  },
  {
    id: '2',
    value: '022_A',
    label: 'Area de mercado 2',
  },
  {
    id: '3',
    value: '03_A',
    label: 'Area de mercado 3',
  },
  {
    id: '4',
    value: '04_A',
    label: 'Area de mercado 4',
  },
  {
    id: '5',
    value: '05_A',
    label: 'Area de mercado 5',
  },
];

export const divisions = [
  {
    id: '1',
    value: '01',
    label: 'Industria y Construcción',
  },
  {
    id: '2',
    value: '02',
    label: 'Consumo y Farma',
  },
  {
    id: '2',
    value: '03',
    label: 'Automotriz',
  },
  {
    id: '3',
    value: '04',
    label: 'Soluciones Médicas',
  },
  {
    id: '4',
    value: '06',
    label: 'Proyectos y Servicios',
  },
  {
    id: '5',
    value: '99',
    label: 'Administración y Finanzas',
  },
];

export const regional = [
  {
    id: '1',
    value: '01_01',
    label: 'La Paz',
  },
  {
    id: '2',
    value: '02_02',
    label: 'Santa Cruz',
  },
  {
    id: '3',
    value: '03_03',
    label: 'Cochabamba',
  },
  {
    id: '4',
    value: '01_07',
    label: 'Oruro',
  },
  {
    id: '5',
    value: '01_04',
    label: 'Potosi',
  },
  {
    id: '6',
    value: '03_07',
    label: 'Sucre',
  },
];

export const manufacturer = {
  id: '1m',
  name: 'DIALIFE SRL',
  email: 'dialife@company.com.bo',
  phone: '5912233444',
};

export const manufacturers = [
  {
    id: '1m',
    name: 'DIALIFE SRL',
    email: 'dialife@company.com.bo',
    phone: '5912233444',
  },
  {
    id: '2m',
    name: 'Fabricante2 SRL',
    email: 'fabricante2@company.com.bo',
    phone: '5912555444',
  },
  {
    id: '3m',
    name: 'fabricante3 SRL',
    email: 'fabricante3@company.com.bo',
    phone: '59126666444',
  },
];

export const manufacturerContact = {
  id: '11m',
  name: 'Alejandra Suarez',
  parentId: '1m',
};

export const manufacturerContactsData = [
  {
    id: '11m',
    name: 'Alejandra Suarez',
    parentId: '1m',
  },
  {
    id: '22m',
    name: 'Carla Montenegro',
    parentId: '1m',
  },
  {
    id: '33m',
    name: 'Daniel Guzman',
    parentId: '2m',
  },
];

export const product = {
  id: '1p',
  name: 'Agujas de fístula',
  itemCodes: [
    'AXXRY2EEYTY',
    'AXDXRY2EEYY',
    'AXX2RY2EEYY',
    'AXXSRY2EEYY',
    'AXXSRY2EEYY',
    'AXXGRY2EEYY',
    'AXXRGY2EEYY',
  ],
};

export const productListData = [
  {
    id: '1p',
    name: 'Agujas de fístula',
    itemCodes: [
      'AXXRY2EEYTY',
      'AXDXRY2EEYY',
      'AXX2RY2EEYY',
      'AXXSRY2EEYY',
      'AXXSRY2EEYY',
      'AXXGRY2EEYY',
      'AXXRGY2EEYY',
    ],
  },
  {
    id: '2p',
    name: 'Producto 2',
    itemCodes: [
      'AXXRY2EEYTY',
      'AXDXRY2EEYY',
      'AXX2RY2EEYY',
      'AXXSRY2EEYY',
      'AXXSRY2EEYY',
      'AXXGRY2EEYY',
      'AXXRGY2EEYY',
    ],
  },
  {
    id: '1p',
    name: 'Producto 3',
    itemCodes: [
      'AXXRY2EEYTY',
      'AXDXRY2EEYY',
      'AXX2RY2EEYY',
      'AXXSRY2EEYY',
      'AXXSRY2EEYY',
      'AXXGRY2EEYY',
      'AXXRGY2EEYY',
    ],
  },
];

export const certicationsList = [
  {
    id: '1',
    aprobacion: '1',
    assigned_user_id: '1',
    cod_productos: '1',
    codigos_producto: '1',
    comentario_creacion: '1',
    comentario_observacion: '1',
    date_aprox_cert: '1',
    date_certif: '1',
    date_entered: '05/07/2023',
    date_register_misa: '1',
    empresa_email: '1',
    empresa_phone: '1',
    estado: 'No autorizada',
    etapa: 'Nueva',
    grupocliente_c: '1',
    id_empresa: '1',
    id_producto: '1',
    id_profesional_acreditado: '1',
    id_solicitante: '1',
    id_tipo_producto: '1',
    idamercado_c: '1',
    iddivision_c: '1',
    idregional_c: '1',
    nro_solicitud: '1030/2023',
    observacion: '1',
    tipo_tramite: 'Inscripción',
  },
  {
    id: '2',
    aprobacion: '2',
    assigned_user_id: '2',
    cod_productos: '2',
    codigos_producto: '2',
    comentario_creacion: '2',
    comentario_observacion: '2',
    date_aprox_cert: '2',
    date_certif: '2',
    date_entered: '05/07/2023',
    date_register_misa: '2',
    empresa_email: '2',
    empresa_phone: '2',
    estado: '2',
    etapa: 'Nueva',
    grupocliente_c: '2',
    id_empresa: '2',
    id_producto: '2',
    id_profesional_acreditado: '2',
    id_solicitante: '2',
    id_tipo_producto: '2',
    idamercado_c: '2',
    iddivision_c: '2',
    idregional_c: '2',
    nro_solicitud: '1025/2023',
    observacion: '2',
    tipo_tramite: 'Inscripcion',
  },
];

export const certification: Certification = {
  id: '1',
  aprobacion: '0',
  assigned_user_id: '1',
  cod_productos: '1',
  codigos_producto: '1',
  comentario_creacion: '1',
  comentario_observacion: '1',
  date_aprox_cert: '1',
  date_certif: '1',
  date_entered: '05/07/2023',
  date_register_misa: '1',
  empresa_email: 'company@gmail.com',
  empresa_phone: '+59133344534',
  estado: 'No autorizada',
  etapa: 'Nueva',
  grupocliente_c: '1',
  id_empresa: '1m',
  id_producto: '1p',
  id_profesional_acreditado: '11m',
  id_solicitante: '1',
  id_tipo_producto: '1',
  idamercado_c: '02_A',
  iddivision_c: '03_A',
  idregional_c: '04_A',
  nro_solicitud: '1030/2023',
  observacion: '1',
  tipo_tramite: 'Inscripción',
  contact_id: '1',
};

export const user = {
  id: '1',
  fullname: 'Armando Ortega',
};

export const manufacturerDocuments = [
  {
    name: 'documento de prueba 1',
    fileName: 'documentTest.pdf',
    expiration_date: '22/07/2023',
    size: '2Mb',
  },
  {
    name: 'documento de prueba 2 (vencido)',
    fileName: 'documentTest2.pdf',
    expiration_date: '22/06/2023',
    size: '2Mb',
  },
];

export const manufacturerData: Manufacturer = {
  id: '1',
  name: 'Embol SRL',
  nit_ci_c: '3343242324',
  phone_office: '22334433',
  website: 'www.embol.com.bo',
  billing_address_street: 'Av/ Union #34',
  annual_revenue: '',
  archivo_c: '',
  assigned_user_id: '',
  billing_address_city: '',
  billing_address_country: '',
  billing_address_postalcode: '',
  billing_address_state: '',
  created_by: '',
  date_entered: '',
  date_modified: '',
  deleted: '',
  description: '',
  employees: '',
  email1: 'company1@example.com',
  hanp_proveedores_type: '',
  idgrupo_c: '',
  idproveedor_c: '',
  industry: '',
  modified_user_id: '',
  ownership: '',
  phone_alternate: '',
  phone_fax: '',
  rating: '',
  shipping_address_city: '',
  shipping_address_country: '',
  shipping_address_postalcode: '',
  shipping_address_state: '',
  shipping_address_street: '',
  ticker_symbol: '',
};

export const manufacturerPromise = (): Promise<Manufacturer> => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      const result = manufacturerData;
      resolve(result);
    }, 2000); // Simulating a 2-second delay
  });
};

export const manufacturerFiltered: Manufacturer[] = [
  {
    id: '1',
    name: 'Embol SRL',
    nit_ci_c: '3343242324',
    phone_office: '22334433',
    website: 'www.embol.com.bo',
    billing_address_street: 'Av/ Union #34',
    annual_revenue: '',
    archivo_c: '',
    assigned_user_id: '',
    billing_address_city: '',
    billing_address_country: '',
    billing_address_postalcode: '',
    billing_address_state: '',
    created_by: '',
    date_entered: '',
    date_modified: '',
    deleted: '',
    description: '',
    employees: '',
    email1: 'company1@example.com',
    hanp_proveedores_type: '',
    idgrupo_c: '',
    idproveedor_c: '',
    industry: '',
    modified_user_id: '',
    ownership: '',
    phone_alternate: '',
    phone_fax: '',
    rating: '',
    shipping_address_city: '',
    shipping_address_country: '',
    shipping_address_postalcode: '',
    shipping_address_state: '',
    shipping_address_street: '',
    ticker_symbol: '',
  },
  {
    id: '2',
    name: 'Genius SRL',
    nit_ci_c: '2243242324',
    phone_office: '22534433',
    website: 'www.genius.com.bo',
    billing_address_street: 'Av/ Libertad #34',
    annual_revenue: '',
    archivo_c: '',
    assigned_user_id: '',
    billing_address_city: '',
    billing_address_country: '',
    billing_address_postalcode: '',
    billing_address_state: '',
    created_by: '',
    date_entered: '',
    date_modified: '',
    deleted: '',
    description: '',
    employees: '',
    email1: 'company1@gmail.com',
    hanp_proveedores_type: '',
    idgrupo_c: '',
    idproveedor_c: '',
    industry: '',
    modified_user_id: '',
    ownership: '',
    phone_alternate: '',
    phone_fax: '',
    rating: '',
    shipping_address_city: '',
    shipping_address_country: '',
    shipping_address_postalcode: '',
    shipping_address_state: '',
    shipping_address_street: '',
    ticker_symbol: '',
  },
  {
    id: '3',
    name: 'ProHealth SRL',
    nit_ci_c: '3343242324',
    phone_office: '22334433',
    website: 'www.prohealt.com.bo',
    billing_address_street: 'Av/ Uruguay #34',
    annual_revenue: '',
    archivo_c: '',
    assigned_user_id: '',
    billing_address_city: '',
    billing_address_country: '',
    billing_address_postalcode: '',
    billing_address_state: '',
    created_by: '',
    date_entered: '',
    date_modified: '',
    deleted: '',
    description: '',
    employees: '',
    email1: 'prohealth@example.com',
    hanp_proveedores_type: '',
    idgrupo_c: '',
    idproveedor_c: '',
    industry: '',
    modified_user_id: '',
    ownership: '',
    phone_alternate: '',
    phone_fax: '',
    rating: '',
    shipping_address_city: '',
    shipping_address_country: '',
    shipping_address_postalcode: '',
    shipping_address_state: '',
    shipping_address_street: '',
    ticker_symbol: '',
  },
];

export const productsFiltered: Product[] = [
  {
    id: '1',
    name: 'Agujas de fistula',
    date_entered: '',
    date_modified: '',
    modified_user_id: '',
    created_by: '',
    description: 'agujas especiales',
    deleted: '',
    assigned_user_id: '',
    iddivision_c: '',
    idamercado_c: '',
    idregional_c: '',
    idgrupocliente_c: '',
    marca_c: '',
    habilitar_c: '',
    descripcion_basica_html_c: '',
    caracteristicas_text_c: '',
    atributos_aux_c: '',
    img_aux_c: '',
    aos_product_categories_id_c: '',
  },
  {
    id: '2',
    name: 'Producto 2',
    date_entered: '',
    date_modified: '',
    modified_user_id: '',
    created_by: '',
    description: 'producto 2',
    deleted: '',
    assigned_user_id: '',
    iddivision_c: '',
    idamercado_c: '',
    idregional_c: '',
    idgrupocliente_c: '',
    marca_c: '',
    habilitar_c: '',
    descripcion_basica_html_c: '',
    caracteristicas_text_c: '',
    atributos_aux_c: '',
    img_aux_c: '',
    aos_product_categories_id_c: '',
  },
  {
    id: '3',
    name: 'Producto 3',
    date_entered: '',
    date_modified: '',
    modified_user_id: '',
    created_by: '',
    description: 'producto 3',
    deleted: '',
    assigned_user_id: '',
    iddivision_c: '',
    idamercado_c: '',
    idregional_c: '',
    idgrupocliente_c: '',
    marca_c: '',
    habilitar_c: '',
    descripcion_basica_html_c: '',
    caracteristicas_text_c: '',
    atributos_aux_c: '',
    img_aux_c: '',
    aos_product_categories_id_c: '',
  },
];

export const productData = (): Product => {
  const product: Product = {
    id: '1',
    name: 'Agujas de fistula',
    date_entered: '',
    date_modified: '',
    modified_user_id: '',
    created_by: '',
    description: 'agujas especiales',
    deleted: '',
    assigned_user_id: '',
    iddivision_c: '',
    idamercado_c: '',
    idregional_c: '',
    idgrupocliente_c: '',
    marca_c: '',
    habilitar_c: '',
    descripcion_basica_html_c: '',
    caracteristicas_text_c: '',
    atributos_aux_c: '',
    img_aux_c: '',
    aos_product_categories_id_c: '',
  };

  return product;
};

export const productPromise = (): Promise<Product> => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      const result = productData();
      resolve(result);
    }, 2000); // Simulating a 2-second delay
  });
};
