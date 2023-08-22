/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, watch } from 'vue';
import {
  useTipoCliente,
  useDivision,
  useDateRange,
} from 'src/composables/useLanguage';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { userStore } from 'src/modules/Users/store/UserStore';
import { useCertificationRequestTableStore } from './../../store/useCertificationRequestTableStore';
import { storeToRefs } from 'pinia';

export const useAdvancedFilter = () => {
  const { listTipoCliente, getListTipoCliente, filterTipoCliente } =
    useTipoCliente();

  const { listDivisiones, getListDivisiones } =
  useDivision();
  const certificationsTableStore = useCertificationRequestTableStore();
  const { listDateRange, getListDateRange } = useDateRange();

  const literalDate = ref('');

  const listStates = [
    {value:'', label:'Todas'},
    {value:'pending', label:'Pendiente'},
    {value:'kept', label:'Observado'},
    {value:'approved', label:'Aprobado'},
    {value:'rejected', label:'Rechazado'}
  ]

  onMounted(async () => {
    await getListDivisiones();
    await getListDateRange();
  });
  /**
   * ? Dialog para mostrar mas campos de busqueda
   */
  const show_more_input = ref(false);
  const todos = ref(false);

  const form = ref([
    {
      input: 'q-input',
      label: 'Nro de solicitud',
      clearable: true,
      field: 'name',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Solicitante',
      clearable: true,
      field: 'solicitante',
      visible: true,
    },
    {
      input: 'q-select',
      field: 'division',
      label: 'División',
      clearable: true,
      option_label: 'label',
      option_value: 'cod_div',
      visible: true,
      emit_value: true,
      map_options: true,
      options: listDivisiones,
    },
    {
      input: 'q-input',
      label: 'Referencia a Producto',
      clearable: true,
      field: 'producto_c',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Fabricante',
      clearable: true,
      field: 'fabricante_c',
      visible: true,
    },
    {
      input: 'q-select',
      field: 'state_aprobacion',
      label: 'Estado',
      clearable: true,
      option_label: 'label',
      option_value: 'value',
      visible: true,
      emit_value: true,
      map_options: true,
      options: listStates,
    },
  ]);


  const { data_filter: dataFilter } = storeToRefs(certificationsTableStore);

  return {
    show_more_input,
    todos,
    literalDate,
    HANSACRM3_URL,
    form,
    dataFilter,
    //form_modules,
    // clearFilter,
  };
};

export interface genericModel {
  [keyof: string]: string | string[];
}
