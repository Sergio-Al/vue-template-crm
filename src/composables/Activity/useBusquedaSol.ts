import { onMounted, ref, watch } from 'vue';
import { userStore } from 'src/modules/Users/store/UserStore';
import { HANSACRM3_URL } from 'src/conections/api_conectors';
// import { searchAccounts } from 'src/modules/Accounts/services/AccountRelatedService';
import { ActivityServices } from 'src/services/ActivityServices';
import Notification from 'src/modules/Prospects/utils/notify';

export const useBusquedaSol = () => {
  //const { listPais, listRegion, getListPais, getListRegion } = usePais();
  const { getFiltroSol } = ActivityServices();
  const { userCRM } = userStore();
  //const { listProspectStatus, getListProspectStatus } = useProspectStatus();
  //const { listProspectSource, getListProspectSource } = useProspectSource();
  onMounted(async () => {
    //await getListUsers(userCRM.iddivision);
    //await getListPais();
    //await getListProspectSource();
    //await getListProspectStatus();
  });

  const showFilter = ref(false);
  const show_more_field = ref(false);
  const show_add = ref(false);

  // const listContacts = ref([] as Datum[]);
  const listPros = ref([]);
  const isFiltering = ref(false);
  const loading = ref(false);
  const selected = ref<{ [key: string]: string }>({});
  const datomando = ref({});

  const estados = [
    { label: 'Aprobado', value: 'approved' },
    { label: 'Observado', value: 'kept,' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Rechazado', value: 'rejected' },
  ];

  const divisiones = [
    { label: '01 Industria y Construcción', value: '01' },
    { label: '02 Consumo y Farma', value: '02,' },
    { label: '03 Automotriz', value: '03' },
    { label: '04 Soluciones Medicas', value: '04' },
    { label: '06 Proyectos y Servicios', value: '06' },
    { label: '07 Windsor', value: '07' },
    { label: '99 Administración y Finanzas ', value: '99' },
  ];

  const formInputs = ref([
    {
      input: 'q-input',
      label: 'Número de solicitud',
      clearable: true,
      field: 'name',
      visible: true,
    },
    {
        input: 'q-select',
        label: 'División',
        field: 'division',
        option_value: 'value',
        option_label: 'label',
        selected_class: 'text-deep-primary text-bold',
        clearable: false,
        visible: true,
        options: divisiones,
        debounce: 0,
        emit_value: true,
        map_options: true,
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
      input: 'q-input',
      label: 'Solicitante',
      clearable: true,
      field: 'assigned_user_id',
      visible: true,
    },
    {
        input: 'q-select',
        label: 'Estado',
        field: 'state_aprobacion',
        option_value: 'value',
        option_label: 'label',
        selected_class: 'text-deep-primary text-bold',
        clearable: false,
        visible: true,
        options: estados,
        debounce: 0,
        emit_value: true,
        map_options: true,
      },
  ]);

  // para vaciar filtro
  const dataFilter = ref<any>({
    name: '',
    division: '04',
    producto_c: '',
    fabricante_c: '',
    solicitante: '', 
    state_aprobacion:'approved',
    id_fabricante:''
  });

  const submitFilter = async (params: any) => {
    datomando.value = {
      page: 1,
      rowsPerPage: 20,
      sortBy: 'numero_solicitud',
      order: 'desc',
      filter: params,
    };
    try {
      loading.value = true;
      listPros.value = await getFiltroSol(datomando.value);
      console.log(listPros.value);
      isFiltering.value = true;
    } catch (error) {
      Notification(
        'negative',
        'error',
        '<strong>Ops!</strong> <br/> Ocurrio un error al realizar la petición'
      );
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const clearFilter = () => {
    isFiltering.value = false;
    listPros.value = [];
    dataFilter.value = {
        name: '',
        division: '04',
        producto_c: '',
        fabricante_c: '',
        solicitante: '',
        state_aprobacion:'approved',
        id_fabricante:''
    };
  };

  const onClose = () => {
    clearFilter();
    showFilter.value = false;
  };

  const cancelInsertion = () => {
    selected.value = {};
    show_add.value = false;
  };

//   watch(
//     () => dataFilter.value.country,
//     (country: string | string[] | undefined) => {
//       dataFilter.value.state = '';
//       if (typeof country === 'string') getListRegion(country);
//     }
//   );

  return {
    onClose,
    clearFilter,
    submitFilter,
    // insertItem,
    cancelInsertion,
    selected,
    loading,
    formInputs,
    isFiltering,
    showFilter,
    show_more_field,
    show_add,
    dataFilter,
    HANSACRM3_URL,
    listPros,
  };
};
