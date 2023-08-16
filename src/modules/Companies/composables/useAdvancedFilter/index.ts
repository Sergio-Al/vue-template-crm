/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, watch } from 'vue';
import {
  useTipoCliente,
  useTipoCuenta,
  useRubro,
  useUserDivision,
  useTipoDocumento,
  usePais,
  useRegimenTributario,
  useDateRange,
} from 'src/composables/useLanguage';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
import { userStore } from 'src/modules/Users/store/UserStore';
import { useCompanyTableStore } from './../../store/UseCompanyTableStore';
import { storeToRefs } from 'pinia';

export const useAdvancedFilter = () => {
  const { listTipoCliente, getListTipoCliente, filterTipoCliente } =
    useTipoCliente();
  const { listTipoCuenta, getListTipoCuenta } = useTipoCuenta();
  const { listRubro, listSubrubro, getListRubro, getListSubrubro } = useRubro();
  const { listUsers, getListUsers, filterUsers } = useUserDivision();
  const { listTipoDocumento, getListTipoDocumento } = useTipoDocumento();
  const { listPais, listRegion, getListPais, getListRegion } = usePais();
  const { listRegimenTributario, getListRegimenTributario } =
    useRegimenTributario();
  const companyTableStore = useCompanyTableStore();
  const { listDateRange, getListDateRange } = useDateRange();

  const literalDate = ref('');

  onMounted(async () => {
    await getListTipoCliente();
    await getListTipoCuenta();
    await getListRubro();
    await getListUsers(userStore().userCRM.iddivision);
    await getListTipoDocumento();
    await getListPais();
    await getListRegimenTributario();
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
      label: 'Razón social',
      clearable: true,
      field: 'razon_social_c',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Nombre Comercial',
      clearable: true,
      field: 'name',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Dirección',
      clearable: true,
      field: 'direccion_c',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Nro de resolucion ministerial',
      clearable: true,
      field: 'resolucion_ministerial_c',
      visible: true,
    },

    {
      input: 'q-input',
      label: 'Teléfono',
      clearable: true,
      field: 'phone_office',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Representante',
      clearable: true,
      field: 'representante',
      visible: true,
    },
    {
      input: 'q-input',
      label: 'Sitio Web',
      clearable: true,
      field: 'website',
      visible: false,
    },
    //   {
    //     input: 'q-select',
    //     field: 'account_type',
    //     label: 'Tipo cuenta',
    //     clearable: true,
    //     option_label: 'label',
    //     option_value: 'cod_c',
    //     visible: true,
    //     emit_value: true,
    //     map_options: true,
    //     options: listTipoCuenta,
    //   },
    //   {
    //     with_avatar: true,
    //     input: 'q-select',
    //     label: 'Creado por',
    //     field: 'created_by',
    //     option_value: 'id',
    //     option_label: 'user_name',
    //     selected_class: 'text-deep-primary text-bold',
    //     clearable: false,
    //     visible: true,
    //     use_chips: true,
    //     multiple: true,
    //     options: listUsers,
    //     use_input: true,
    //     debounce: 0,
    //     emit_value: true,
    //     map_options: true,
    //     filter_function: filterUsers,
    //   },
  ]);

  const form_modules = ref([
    {
      input: 'q-select',
      field: 'tipocuenta_c',
      label: 'Contacto',
      clearable: false,
      option_label: 'label',
      option_value: 'cod_c',
      visible: false,
      emit_value: true,
      map_options: true,
      options: listTipoCuenta,
    },
    {
      input: 'q-select',
      field: 'tipocuenta_c',
      label: 'Cotizaciones',
      clearable: false,
      option_label: 'label',
      option_value: 'cod_c',
      visible: false,
      emit_value: true,
      map_options: true,
      options: listTipoCuenta,
    },
    {
      input: 'q-select',
      field: 'tipocuenta_c',
      label: 'Campaña',
      clearable: false,
      option_label: 'label',
      option_value: 'cod_c',
      visible: false,
      emit_value: true,
      map_options: true,
      options: listTipoCuenta,
    },
    {
      input: 'q-select',
      field: 'tipocuenta_c',
      label: 'Propectos',
      clearable: false,
      option_label: 'label',
      option_value: 'cod_c',
      visible: false,
      emit_value: true,
      map_options: true,
      options: listTipoCuenta,
    },
    {
      input: 'q-select',
      field: 'tipocuenta_c',
      label: 'Oportunidades',
      clearable: false,
      option_label: 'label',
      option_value: 'cod_c',
      visible: false,
      emit_value: true,
      map_options: true,
      options: listTipoCuenta,
    },
  ]);

  const { data_filter: dataFilter } = storeToRefs(companyTableStore);

  // watch(
  //   () => dataFilter.value?.industry,
  //   (industry: string | string[] | undefined) => {
  //     dataFilter.value.sub_industry = '';
  //     if (typeof industry === 'string') getListSubrubro(industry);
  //   }
  // );
  // watch(
  //   () => dataFilter.value?.country,
  //   (country: string | string[]) => {
  //     dataFilter.value.state = '';
  //     if (typeof country === 'string') getListRegion(country);
  //   }
  // );

  // watch(
  //   () => dataFilter.value?.account_type,
  //   (account_type: string) => {
  //     const last = form.value.find((el) => el.field == 'lastname');
  //     const com = form.value.find((el) => el.field == 'comercial_name');
  //     if (last != undefined && com != undefined) {
  //       if (account_type === 'Privada') {
  //         last.visible = true;
  //         com.visible = false;
  //       } else {
  //         last.visible = false;
  //         com.visible = true;
  //       }
  //     }
  //   }
  // );

  // const clearFilter = () => {
  //   dataFilter.value = {
  //     easyFilter: '',
  //     name: '',
  //     lastname: '',
  //     comercial_name: '',
  //     client_type: '',
  //     account_type: '',
  //     aio_code: '',
  //     nit_ci: '',
  //     cellphone: '',
  //     email: '',
  //     industry: '',
  //     sub_industry: '',
  //     country: '',
  //     state: '',
  //     city: '',
  //     street: '',
  //     document_type: '',
  //     tax_regime: '',
  //     website: '',
  //     created_by: [],
  //     modified_by: [],
  //     assigned_to: [],
  //     creation_date: { from: '', to: '', operator: '', option: '' },
  //   };
  // };

  return {
    show_more_input,
    todos,
    literalDate,
    HANSACRM3_URL,
    form,
    dataFilter,
    form_modules,
    //clearFilter,
  };
};

export interface genericModel {
  [keyof: string]: string | string[];
}
