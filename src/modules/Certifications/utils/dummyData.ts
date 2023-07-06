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
  }
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

export const certification = {
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
};

export const user = {
  id: '1',
  fullname: 'Armando Ortega',
};
