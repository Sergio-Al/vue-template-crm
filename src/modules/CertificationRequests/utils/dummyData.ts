import { axios_NS_07 } from 'src/conections/axiosCRM';
//import { CertificationMain } from './dummyData';
import {
  CertificacionBody,
  Certification,
  CertificationModel,
  CertificationRequest,
  EmpresaParticipacion,
  Manufacturer,
  Product,
} from './types';
import { SearchUser } from 'src/components/types';

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

export const certificationRequest: CertificationRequest = {
  assigned_user_id: '1',
  assigned_user_link: '',
  assigned_user_name: 'Administrator',
  cod_misa_c: '',
  cod_productos_c: '',
  comentario_solicitud_c: '',
  contact_fabricante_c: '',
  correo_fabricante_c: '',
  created_by: '5c19df6d-0cf0-6e23-7c01-629fb9d01588',
  created_by_link: '',
  created_by_name: 'Erik Maquera',
  date_entered: '2023-07-31 00:00:00',
  date_modified: '2023-07-31 19:19:41',
  date_planning_cert_c: '',
  date_real_cert_c: '',
  date_register_misa_c: '',
  deleted: 0,
  description: '',
  estado_aprobacion_c: 'pending',
  estado_c: '',
  etapa_c: '',
  fabricante_c: 'Olympus SA',
  hance_certificacion_id_c: '',
  hance_empresa_id_c: '',
  id: 'd5dd1b82-68a2-4a54-7c2a-64c7ccfbb11c',
  id_empresa_c: '',
  id_profesional_acreditado_c: '',
  id_user_solicitante_c: '',
  idamercado_c: '05_01',
  iddivision_c: '05',
  idregional_c: '07_09',
  modified_by_name: 'Erik Maquera',
  modified_user_id: '5c19df6d-0cf0-6e23-7c01-629fb9d01588',
  modified_user_link: '',
  name: '1003/2023',
  nro_ruta_c: '',
  producto_c: 'Tomografo X',
  referencia_prods: 'item 2,|item 1',
  user_id_c: '25e1d045-64e8-60d1-4ba0-63d81c7bb46c',
};

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

// export const manufacturerFiltered: Manufacturer[] = [
//   {
//     id: '1',
//     name: 'Embol SRL',
//     nit_ci_c: '3343242324',
//     phone_office: '22334433',
//     website: 'www.embol.com.bo',
//     billing_address_street: 'Av/ Union #34',
//     annual_revenue: '',
//     archivo_c: '',
//     assigned_user_id: '',
//     billing_address_city: '',
//     billing_address_country: '',
//     billing_address_postalcode: '',
//     billing_address_state: '',
//     created_by: '',
//     date_entered: '',
//     date_modified: '',
//     deleted: '',
//     description: '',
//     employees: '',
//     email1: 'company1@example.com',
//     hanp_proveedores_type: '',
//     idgrupo_c: '',
//     idproveedor_c: '',
//     industry: '',
//     modified_user_id: '',
//     ownership: '',
//     phone_alternate: '',
//     phone_fax: '',
//     rating: '',
//     shipping_address_city: '',
//     shipping_address_country: '',
//     shipping_address_postalcode: '',
//     shipping_address_state: '',
//     shipping_address_street: '',
//     ticker_symbol: '',
//   },
//   {
//     id: '2',
//     name: 'Genius SRL',
//     nit_ci_c: '2243242324',
//     phone_office: '22534433',
//     website: 'www.genius.com.bo',
//     billing_address_street: 'Av/ Libertad #34',
//     annual_revenue: '',
//     archivo_c: '',
//     assigned_user_id: '',
//     billing_address_city: '',
//     billing_address_country: '',
//     billing_address_postalcode: '',
//     billing_address_state: '',
//     created_by: '',
//     date_entered: '',
//     date_modified: '',
//     deleted: '',
//     description: '',
//     employees: '',
//     email1: 'company1@gmail.com',
//     hanp_proveedores_type: '',
//     idgrupo_c: '',
//     idproveedor_c: '',
//     industry: '',
//     modified_user_id: '',
//     ownership: '',
//     phone_alternate: '',
//     phone_fax: '',
//     rating: '',
//     shipping_address_city: '',
//     shipping_address_country: '',
//     shipping_address_postalcode: '',
//     shipping_address_state: '',
//     shipping_address_street: '',
//     ticker_symbol: '',
//   },
//   {
//     id: '3',
//     name: 'ProHealth SRL',
//     nit_ci_c: '3343242324',
//     phone_office: '22334433',
//     website: 'www.prohealt.com.bo',
//     billing_address_street: 'Av/ Uruguay #34',
//     annual_revenue: '',
//     archivo_c: '',
//     assigned_user_id: '',
//     billing_address_city: '',
//     billing_address_country: '',
//     billing_address_postalcode: '',
//     billing_address_state: '',
//     created_by: '',
//     date_entered: '',
//     date_modified: '',
//     deleted: '',
//     description: '',
//     employees: '',
//     email1: 'prohealth@example.com',
//     hanp_proveedores_type: '',
//     idgrupo_c: '',
//     idproveedor_c: '',
//     industry: '',
//     modified_user_id: '',
//     ownership: '',
//     phone_alternate: '',
//     phone_fax: '',
//     rating: '',
//     shipping_address_city: '',
//     shipping_address_country: '',
//     shipping_address_postalcode: '',
//     shipping_address_state: '',
//     shipping_address_street: '',
//     ticker_symbol: '',
//   },
// ];

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
    name: 'Equipo de Rayos X',
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
    name: 'Sillon Dental',
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

export const CertificationMain = [
  {
    id: 'e5878814-d3c9-3334-f72b-64b19395a007',
    name: '5002/2023',
    tipo_tramite_c: 'Inscripción',
    profesional_acreditado: 'Gabriela Pamela Loza Carrasco',
    cargo: 'Ejecutivo de Ventas',
    tipo_producto_c: 'dispositivo',
    etapa_c: 'Enviada a Misa',
    estado_c: 'Observada',
    fecha_creacion: '14/07/2023',
    producto_c: 'tomografo',
    id_proveedor: '8AF31262-4956-41E7-ADB0-ED0B5F7219E',
    proveedor: 'DRAGER CHILE LIMITADA',
    id_solicitud: '4ae1b2f1-f632-7329-3d02-64c96206d4b8',
    nro_solicitud: '1007/2023',
    cod_misa_c: 'Sin información',
    nro_ruta_c: 'Sin información',
    nro_cert_c: 'Sin información',
  },
  {
    name: '5001/2023',
    user_id_c: '1u',
    date_entered_c: '2023-07-31 00:00:00',
    hance_empresa_id_c: '1e',
    participacion_como: {
      id: '1e',
      razon_social: 'razon social',
      direccion_participacion: 'Av. 33',
      resolucion_ministerial: '222',
    },
    user_id1_c: '1pa',
    profesional_acreditado: {
      id: '1pa',
      name: 'Gabriela Canseco',
      nro_de_matricula: '333',
    },
    tipo_tramite_c: 'Inscripcion',
    tipo_producto_c: 'Dispositivo',
    producto_id_c: '3p',
    producto: {
      id: '3p',
      name: 'Agujas de fístula',
    },
    hance_proveedor_id_c: '1f',
    fabricante: {
      id: '1f',
      name: 'DIALIFE',
      pais: 'Bolivia',
      telefono: '2233442',
      correo: 'dialife@example.com',
      direccion_fabricante: 'Av. Costanera',
    },
    hance_solicitud_id_c: '1s',
    assigned_user_id: '1',
    etapa_c: '',
    estado_c: 'En Curso',
    date_modified: '2023-07-31 00:00:00',
  },
  {
    name: '5002/2023',
    user_id_c: '2u',
    date_entered_c: '2023-07-31 00:00:00',
    hance_empresa_id_c: '2e',
    participacion_como: {
      id: '2e',
      razon_social: 'razon social',
      direccion_participacion: 'Av. 33',
      resolucion_ministerial: '222',
    },
    user_id1_c: '2pa',
    profesional_acreditado: {
      id: '2pa',
      name: 'Gabriela Canseco',
      nro_de_matricula: '333',
    },
    tipo_tramite_c: 'Inscripcion',
    tipo_producto_c: 'Dispositivo',
    producto_id_c: '3p',
    producto: {
      id: '3p',
      name: 'Tomógrafo',
    },
    hance_proveedor_id_c: '1f',
    fabricante: {
      id: '2f',
      name: 'DIALIFE',
      pais: 'Bolivia',
      telefono: '2233442',
      correo: 'dialife@example.com',
      direccion_fabricante: 'Av. Costanera',
    },
    hance_solicitud_id_c: '2s',
    assigned_user_id: '1',
    etapa_c: '',
    estado_c: 'En Curso',
    date_modified: '2023-07-31 00:00:00',
  },
  {
    name: '5003/2023',
    user_id_c: '1u',
    date_entered_c: '2023-07-31 00:00:00',
    hance_empresa_id_c: '3e',
    participacion_como: {
      id: '3e',
      razon_social: 'razon social',
      direccion_participacion: 'Av. 33',
      resolucion_ministerial: '222',
    },
    user_id1_c: '3pa',
    profesional_acreditado: {
      id: '3pa',
      name: 'Gabriela Canseco',
      nro_de_matricula: '333',
    },
    tipo_tramite_c: 'Inscripcion',
    tipo_producto_c: 'Dispositivo',
    producto_id_c: '3p',
    producto: {
      id: '3p',
      name: 'Equipo de Rayos X',
    },
    hance_proveedor_id_c: '3f',
    fabricante: {
      id: '3f',
      name: 'DIALIFE',
      pais: 'Bolivia',
      telefono: '2233442',
      correo: 'dialife@example.com',
      direccion_fabricante: 'Av. Costanera',
    },
    hance_solicitud_id_c: '3s',
    assigned_user_id: '1',
    etapa_c: 'revision',
    status: '',
    estado_c: 'En Curso',
    date_modified: '2023-07-31 00:00:00',
  },
];

export const productPromise = (): Promise<Product> => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      const result = productData();
      resolve(result);
    }, 2000); // Simulating a 2-second delay
  });
};

export const certificationRequestPromise = (
  id: string
): Promise<CertificationRequest> => {
  console.log(id);
  return new Promise(async (resolve) => {
    // const { data } = await axios_NS_07.get(`/solicitud/${id}`);
    // resolve(data);
    // TODO: llamada a servicio
    // devolver con resolve

    setTimeout(() => {
      resolve(certificationRequest);
    }, 500);
  });
};

export const certificationsRequestPromise = (): Promise<
  CertificationRequest[]
> => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      const result = certificationRequests;
      resolve(result);
    }, 2000); // Simulating a 2-second delay
  });
};

export const certificationsPromise = (): Promise<CertificationModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CertificationMain);
    }, 500);
  });
};

export const getUsersPromise = (): Promise<SearchUser[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          module: 'Sales',
          id: '1234',
          date_entered: '2023-08-04',
          fullname: 'John Doe',
          email_address: 'john.doe@example.com',
          phone: '555-123-4567',
          email: '1',
          whatsapp: '0',
          title: 'Sales Representative',
          primary_item: true,
        },
        {
          module: 'Support',
          id: '5678',
          date_entered: '2023-08-04',
          fullname: 'Jane Smith',
          email_address: 'jane.smith@example.com',
          phone: '555-987-6543',
          email: '0',
          whatsapp: '1',
          title: 'Support Specialist',
          primary_item: false,
        },
        // Add more dummy data objects as needed...
      ]);
    }, 500);
  });
};

export const getEmpresaParticipacionPromise = (): Promise<
  EmpresaParticipacion[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '139c3fdd-c676-3071-b88c-64b0022b6839',
          name: 'HANSA LTDA',
          razon_social_c: 'HANSA LTDA',
          direccion_c: 'Yanacocha Esq. Mercado No 1004',
          resolucion_ministerial_c: '0423',
          resolucion_ministerial_date_c:'09/24/1999',
          titular:'Patricio Kyllman Diekelmann'
        },
        {
          id: '21206e27-9e50-c28c-30a6-64b00679af8e',
          name: 'MIPRO LTDA',
          razon_social_c: 'MIPRO LTDA',
          direccion_c: 'Yanacocha Esq. Mercado No 1004',
          resolucion_ministerial_c: '12345',
        },
        {
          id: '3',
          name: 'CIBO LTDA',
          razon_social_c: 'MIPRO LTDA',
          direccion_c: 'Yanacocha Esq. Mercado No 1004',
          resolucion_ministerial_c: '12345',
        },
        // Add more dummy data objects as needed...
      ]);
    }, 500);
  });
};

export const createCertificationPromise = (): Promise<CertificacionBody> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'ID_1',
        assigned_user_id: '1',
        billing_address_street: 'Street_1',
        billing_address_country: 'Country_1',
        cod_misa_c: 'CodMisa_1',
        date_entered: '2023-08-06',
        date_planning_cert_c: '2023-08-10',
        date_real_cert_c: '2023-08-15',
        date_register_misa_c: '2023-08-20',
        email1: 'email_1@example.com',
        estado_c: 'Estado_1',
        etapa_c: 'Etapa_1',
        hance_empresa_id_c: '1',
        hanp_proveedores_id_c: '1',
        idamercado_c: 'IDMercado_1',
        iddivision_c: 'IDDivision_1',
        idgrupocliente_c: 'IDGrupoCliente_1',
        idregional_c: 'IDRegional_1',
        licence: 'Licence_1',
        name: 'Name_1',
        nro_cert_c: 'CertNumber_1',
        nro_ruta_c: 'RutaNumber_1',
        tipo_producto_c: 'TipoProducto_1',
        tipo_tramite_c: 'TipoTramite_1',
        phone_office: 'Phone_1',
        user_id_c: 'Solicitante_1',
        user_idl_c: 'ProfesionalAcreditado_1',
      });
    }, 2000);
  });
};

export const rowsSchema = [
  {
    nro: '2.1',
    name: 'Formulario de Solicitud para registro y control de calidad de Medicamentos (DINAMED Form 005)',
    module: 'Certificaciones',
    auto: false,
    binding: true,
  },
  {
    nro: '1',
    name: 'Formulario 012, 025, 027, Formato Unico',
    module: 'Certificaciones',
    auto: false,
    binding: true,
  },
  {
    nro: '2',
    name: 'Anexo al Formulario 012',
    module: 'Certificaciones',
    auto: false,
    binding: false,
  },
  {
    nro: '3',
    name: 'Anexo al Formulario 027',
    module: 'Certificaciones',
    auto: false,
    binding: false,
  },
  {
    nro: '4',
    name: 'Anexo al Formato Unico',
    module: 'Certificaciones',
    auto: false,
    binding: false,
  },
  {
    nro: '5',
    name: 'Pago por Concepto de Servicio',
    module: 'Certificaciones',
    auto: false,
    binding: true,
  },
  {
    nro: '6',
    name: 'Nota de Solicitud',
    module: 'Certificaciones',
    auto: false,
    binding: true,
  },
  {
    nro: '7',
    name: 'Documentación de Respaldo',
    module: 'Certificaciones',
    auto: false,
    binding: true,
  },
]

export const rowsDocsProveedor = [
  {
    id: '1',
    name: 'File de Cliente Olympus',
    category: 'File de Cliente',
    tipo:'Formulario',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/01/2023',
    date_end: '31/12/2023',
    state:'Pendiente'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
  {
    id: '2',
    name: 'Marketing Olympus',
    category: 'Marketing',
    tipo:'Marca',
    division: '04 Soluciones Medicas',
    amercado:'01 Imagenología',
    date_start: '01/06/2020',
    date_end: '12/08/2023',
    state:'En Revisión'
  },
]

