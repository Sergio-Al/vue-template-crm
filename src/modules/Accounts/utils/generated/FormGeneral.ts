import { FieldsModels } from '../types/index';
export const infoClientFieldsBase: FieldsModels[] = [
  {
    id: '1',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    dense: true,
    label: 'Tipo de documento',
    field: 'tipo_documento_c',
    options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
    optionsdense: true,
    outlined: true,
    rules: ['fieldRequired'],
  },
  {
    id: '2',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'nit_ci_c',
    label: 'CI/NIT',
    outlined: true,
    rules: ['fieldRequired'],
  },
  {
    id: '3',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    dense: true,
    disable: false,
    label: 'Tipo cliente',
    loading: false,
    field: 'account_type',
    outlined: true,
    options: ['Cliente', 'Analista', 'Competidor', 'Apple', 'Oracle'],
    optionsdense: true,
  },
  {
    id: '4',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    dense: true,
    field: 'regimen_tributario_c',
    label: 'Régimen tributario',
    options: [
      'No inscritos al padron de Contribuyentes',
      'Analista',
      'Competidor',
      'Apple',
      'Oracle',
    ],
    optionsdense: true,
    outlined: true,
  },
  {
    id: '5',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    dense: true,
    field: 'industry',
    label: 'Rubro',
    options: [
      'No inscritos al padron de Contribuyentes',
      'Analista',
      'Competidor',
      'Apple',
      'Oracle',
    ],
    optionsdense: true,
    outlined: true,
    childrenName: 'subrubro',
  },
  {
    id: '6',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    dense: true,
    field: 'subindustry_c',
    label: 'Sub Rubro',
    options: [
      'No inscritos al padron de Contribuyentes',
      'Analista',
      'Competidor',
      'Apple',
      'Oracle',
    ],
    optionsdense: true,
    outlined: true,
    childrenFrom: 'subrubro',
  },
  {
    id: '7',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    field: 'billing_address_country',
    label: 'Pais',
    dense: true,
    optionsdense: true,
    options: ['Bolivia', 'Peru', 'Chile'],
    outlined: true,
    childrenName: 'regiones',
  },
  {
    id: '8',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-select',
    label: 'Departamento',
    field: 'billing_address_state_list_c',
    dense: true,
    options: ['La Paz', 'Cochabamba', 'Santa Cruz'],
    optionsdense: true,
    outlined: true,
    childrenFrom: 'regiones',
  },
  {
    id: '9',
    class: 'col-12 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'billing_address_city',
    label: 'Ciudad',
    outlined: true,
  },
];

export const infoClientFieldsPrivate: FieldsModels[] = [
  {
    id: '10',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'names_c',
    label: 'Nombres',
    outlined: true,
    rules: ['fieldRequired'],
  },
  {
    id: '11',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'lastname_c',
    label: 'Apellidos',
    outlined: true,
    rules: ['fieldRequired'],
  },
  ...infoClientFieldsBase,
];

export const infoClientFieldsCommercial: FieldsModels[] = [
  {
    id: '12',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'name',
    label: 'Nombres',
    outlined: true,
    rules: ['fieldRequired'],
  },
  {
    id: '13',
    class: 'col-6 q-px-xs q-pb-xs',
    component: 'q-input',
    dense: true,
    field: 'nombre_comercial',
    label: 'Nombre Comercial',
    outlined: true,
    rules: ['fieldRequired'],
  },
  ...infoClientFieldsBase,
];

export const infoClientDirection: FieldsModels[] = [
  {
    id: '1',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    field: 'avenue',
    label: 'Avenida',
    outlined: true,
  },
  {
    id: '2',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    field: 'number_house',
    label: 'Nro. domicilio',
    outlined: true,
  },
  {
    id: '4',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    field: 'street',
    label: 'Calle',
    outlined: true,
  },
  {
    id: '5',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    extraField: true,
    field: 'square',
    label: 'Plaza',
    outlined: true,
  },
  {
    id: '6',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    extraField: true,
    field: 'stree_2',
    label: 'Callejon',
    outlined: true,
  },
  {
    id: '7',
    class: 'col-12',
    component: 'q-input',
    dense: true,
    extraField: true,
    field: 'floor',
    label: 'Piso',
    outlined: true,
  },
];
