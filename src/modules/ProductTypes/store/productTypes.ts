import { defineStore } from 'pinia';

import {
  Filter,
  Pagination,
  PaginationTable,
  UpdateMassiveModel,
} from '../utils/types';
import { axios_PREFERENCES } from 'src/conections/axiosCRM';
import { Notification } from 'src/composables';
import { userStore } from 'src/modules/Users/store/UserStore';

const { userCRM } = userStore();

export const useProductTypesStore = defineStore('product-types-store', {
  state: () => ({
    loading: false,
    mongo_id: '',
    pagination: {
      page: 1,
      sortBy: 'nombre',
      descending: true,
      rowsPerPage: 10,
      rowsNumber: 10,
    },
    // datos para el filtro, lo que se enviara a la base de datos
    data_filter: {
      nombre: '',
      iddivision_c: '',
      idamercado_c: '',
      idregional_c: '',
      idgrupocliente_c: '',
      created_by: [],
      modified_by: [],
      assigned_to: [],
      creation_date: { from: '', to: '', operator: '', option: '' },
    },
    data_table: {
      rows: [] as any,
      columns: [
        {
          name: 'id_tipo',
          align: 'left',
          label: 'id tipo',
          field: 'id_tipo',
          sortable: true,
          visible: true,
        },
        {
          name: 'nombre',
          align: 'left',
          label: 'Nombre',
          field: 'nombre',
          sortable: true,
          visible: true,
        },
        {
          name: 'iddivision_c',
          align: 'left',
          label: 'División',
          field: 'iddivision_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'idamercado_c',
          align: 'left',
          label: 'Área de mercado',
          field: 'idamercado_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'idregional_c',
          align: 'left',
          label: 'Regional',
          field: 'idregional_c',
          sortable: true,
          visible: true,
        },
        {
          name: 'idgrupocliente_c',
          align: 'left',
          label: 'Grupo cliente',
          field: 'idgrupocliente_c',
          sortable: true,
          visible: true,
        },
      ],
    },
    visible_fields: [
      'nombre',
      'iddivision_c',
      'idamercado_c',
      'idgrupocliente_c',
    ],
    visible_columns: [
      'nombre',
      'iddivision_c',
      'idregional_c',
      'idgrupocliente_c',
    ],
  }),
  actions: {
    async getUserConfig() {
      // const configuration = await getTablePreferences();
      // if (configuration) {
      //   this.mongo_id = configuration._id;
      //   this.pagination.rowsPerPage = configuration.pagination.rowsPerPage;
      //   this.pagination.sortBy = configuration.pagination.sortBy;
      //   this.pagination.descending = configuration.pagination.descending;
      //   this.visible_columns = configuration.visible_columns;
      //   this.data_filter = configuration.data_filter;
      //   this.visible_fields = configuration.visible_fields;
      // } else {
      //   this.mongo_id = await saveTablePreferences({
      //     pagination: this.pagination,
      //     visible_columns: this.visible_columns,
      //     data_filter: this.data_filter,
      //     visible_fields: this.visible_fields,
      //   });
      // }
    },

    async getListProductType(props: {
      pagination: Pagination;
      filter: Filter;
    }) {
      try {
        this.loading = true;
        const { pagination, filter } = props;
        const { page, rowsPerPage, sortBy, descending } = pagination;
        const params = {
          page: page,
          rowsPerPage: rowsPerPage,
          sortBy: sortBy,
          order: descending ? 'desc' : 'asc',
          filter: filter,
        };
        // Llamar al servicio
        // const data = await getTableData(params);
        // datos falsos
        const data = {
          rows: [
            {
              id_tipo: 'fae73903-09bd-49f5-8c06-27f06b3194b7',
              nombre: 'Evaporated Milk - Skim',
              iddivision_c: '01H1TSNGW1X3FWHQJRE1WK7K07',
              idamercado_c: '01H1TSNGW1H6WJMDENG5QZ9DRR',
              idregional_c: '01H1TSNGW27REVEYFSQZG0QJ0Q',
              idgrupocliente_c: '01H1TSNGW26AHM816Q9BNB96BG',
            },
            {
              id_tipo: 'be03073b-2f4c-4cab-9b12-615d62991802',
              nombre: 'Hog / Sausage Casing - Pork',
              iddivision_c: '01H1TSNGW3KGZPC56H792DNJ87',
              idamercado_c: '01H1TSNGW42A3WEPH7V06MEHD3',
              idregional_c: '01H1TSNGW5GMYK9TB85HE7RBMA',
              idgrupocliente_c: '01H1TSNGW5PVNAGVT3CZJ9HP3M',
            },
            {
              id_tipo: 'b62b7149-5b35-44ae-9a29-1a8e699a9f22',
              nombre: 'Bagelers - Cinn / Brown Sugar',
              iddivision_c: '01H1TSNGW5WE7108RXY2SZPN80',
              idamercado_c: '01H1TSNGW7Y7ZJ362X1BAT2F24',
              idregional_c: '01H1TSNGW7Q9YBNMM8S7MN1BSQ',
              idgrupocliente_c: '01H1TSNGW7NVMQR2NV08H63YT5',
            },
            {
              id_tipo: '3d18c5e6-55a4-488a-9aa5-a4698b07d67b',
              nombre: 'Nougat - Paste / Cream',
              iddivision_c: '01H1TSNGW9WJAD9ZBYJ34FMYZB',
              idamercado_c: '01H1TSNGW9HF1K03FJTXRV3F36',
              idregional_c: '01H1TSNGWAQCWX4Q98XPHQ7BAA',
              idgrupocliente_c: '01H1TSNGWAHZWA75E40PGW7GGZ',
            },
            {
              id_tipo: '9fcf37ba-afd8-4e92-8d1c-abe76e67c839',
              nombre: 'Mustard - Pommery',
              iddivision_c: '01H1TSNGWCRGQDDER82A6QB9AP',
              idamercado_c: '01H1TSNGWCVQAABKRMN4GP60T2',
              idregional_c: '01H1TSNGWCHR9GMCFPJDA2PP23',
              idgrupocliente_c: '01H1TSNGWC36VWAKSNHFWKSMJ1',
            },
            {
              id_tipo: '1b7c031e-224a-42dc-ab1c-002cbd065b70',
              nombre: 'Asparagus - Mexican',
              iddivision_c: '01H1TSNGWEP29CXCFTWRWFTM0B',
              idamercado_c: '01H1TSNGWER8WPP1B7N7EBR6WK',
              idregional_c: '01H1TSNGWF9XXN774TABXHAKC3',
              idgrupocliente_c: '01H1TSNGWFN55FHC3ZE99H95VG',
            },
            {
              id_tipo: 'fad0c499-d021-4049-b088-c3c9223276be',
              nombre: 'Garlic - Peeled',
              iddivision_c: '01H1TSNGWGE28JCT5AKSQNAB1Z',
              idamercado_c: '01H1TSNGWH208QYAAV8PZVZ003',
              idregional_c: '01H1TSNGWHM4SRHQMYM4EFEVAQ',
              idgrupocliente_c: '01H1TSNGWHYFXKMXR99QBS41J8',
            },
            {
              id_tipo: '0ad6edd3-e73c-4066-a077-f228c05d3c80',
              nombre: 'Paper - Brown Paper Mini Cups',
              iddivision_c: '01H1TSNGWKAWHABGCHNPSGE1E2',
              idamercado_c: '01H1TSNGWK4X0X1YV8WCNHF0CP',
              idregional_c: '01H1TSNGWKHTEES5Y3N5H2DMD8',
              idgrupocliente_c: '01H1TSNGWNHDDDPEBGKDTSATD8',
            },
            {
              id_tipo: '22fbb4d6-e3bb-483c-9fe0-b1da9eea5e44',
              nombre: 'Wine - Mondavi Coastal Private',
              iddivision_c: '01H1TSNGWP19JHCYK90313J90B',
              idamercado_c: '01H1TSNGWPYKFMSJXXFZ7VP2QQ',
              idregional_c: '01H1TSNGWPMMQCRA5R0GRX0XTG',
              idgrupocliente_c: '01H1TSNGWQHK19EPJGWB7923ZC',
            },
            {
              id_tipo: '606832d6-2d4c-4303-8a60-7b2be6cdae40',
              nombre: 'Baking Soda',
              iddivision_c: '01H1TSNGWRSR33HYCAWNNGFRA9',
              idamercado_c: '01H1TSNGWRTRVNFQDR6DW7FRNX',
              idregional_c: '01H1TSNGWTDACN9PAB8N17FJCP',
              idgrupocliente_c: '01H1TSNGWTNVYQWCC5MPPYFJJF',
            },
            {
              id_tipo: 'ba989bcf-903c-405d-ba15-dd3fb23fa117',
              nombre: 'Octopus - Baby, Cleaned',
              iddivision_c: '01H1TSNGWVJ77JJFZ9R968Z16F',
              idamercado_c: '01H1TSNGWVN6JXW36CCGKG35B2',
              idregional_c: '01H1TSNGWWH1KV24N1H3TDP928',
              idgrupocliente_c: '01H1TSNGWWFPA6S74E5RJCQTR7',
            },
            {
              id_tipo: '734e5973-c541-4db3-b14b-10b910dc5867',
              nombre: 'Port - 74 Brights',
              iddivision_c: '01H1TSNGWX531W9EY4BBECKVSM',
              idamercado_c: '01H1TSNGWZXNNZS7DDY3MH4SR3',
              idregional_c: '01H1TSNGWZBC2B2GB2VGJPEJ0W',
              idgrupocliente_c: '01H1TSNGWZGK5TBZ2HZSWCADWE',
            },
            {
              id_tipo: 'e330228a-6721-41b8-9047-f09b4d1df2bd',
              nombre: 'Sour Puss Raspberry',
              iddivision_c: '01H1TSNGX0RXZ844NBR73PZV2V',
              idamercado_c: '01H1TSNGX0JGNTD4F81CG2KQPW',
              idregional_c: '01H1TSNGX19FCXJWCDK66H0D5Y',
              idgrupocliente_c: '01H1TSNGX135F14GCGH6JQWQWT',
            },
            {
              id_tipo: '070ded78-8651-47ba-b8cc-2750025bfb80',
              nombre: 'Cheese - Roquefort Pappillon',
              iddivision_c: '01H1TSNGX2CYHFEJHXRE6G9A4H',
              idamercado_c: '01H1TSNGX2MG0BPAXBB7J93ZS4',
              idregional_c: '01H1TSNGX2NANY1WM207J4EK4J',
              idgrupocliente_c: '01H1TSNGX3EZC4CA6FNJ1D80A9',
            },
            {
              id_tipo: '4fde08de-be05-4dc6-b8ef-315a7e5733e0',
              nombre: 'Oil - Peanut',
              iddivision_c: '01H1TSNGX4R0WVMCXJ6812YY91',
              idamercado_c: '01H1TSNGX4R20WQ2ZFJAW93P3E',
              idregional_c: '01H1TSNGX484Z77509QRPHBH14',
              idgrupocliente_c: '01H1TSNGX404MK5G7TPF7BX46R',
            },
            {
              id_tipo: 'b50d8cb1-f449-4301-a953-9da794b9e281',
              nombre: '7up Diet, 355 Ml',
              iddivision_c: '01H1TSNGX6G6H4BP8TQQX9VBC5',
              idamercado_c: '01H1TSNGX67M9P8KVWGNARD332',
              idregional_c: '01H1TSNGX680RFMED5K83JG0N0',
              idgrupocliente_c: '01H1TSNGX6KTYQ16MYGP9WMKST',
            },
            {
              id_tipo: '9561b667-d7c9-4609-923e-46a9d70ac8f9',
              nombre: 'Wine - Marlbourough Sauv Blanc',
              iddivision_c: '01H1TSNGX7EG6FJ5NNV2MRQC1J',
              idamercado_c: '01H1TSNGX8PVJ94HQPHZS18FMV',
              idregional_c: '01H1TSNGX83B4SVVDFRX0JJC4R',
              idgrupocliente_c: '01H1TSNGX8GV8ABFD68C0QF5FV',
            },
            {
              id_tipo: '5ce1bb1c-70b6-4d02-9dad-e83f19f8cefd',
              nombre: 'Hagen Daza - Dk Choocolate',
              iddivision_c: '01H1TSNGX9955R7WW0BSNBC290',
              idamercado_c: '01H1TSNGXAZDYYR3H6C0RHY5Y4',
              idregional_c: '01H1TSNGXAAV7AJ256KBN4MBTT',
              idgrupocliente_c: '01H1TSNGXA1YECWMM97RDZC2VB',
            },
            {
              id_tipo: 'c121399e-dfd8-4914-b614-8c5a0d987802',
              nombre: 'Tuna - Loin',
              iddivision_c: '01H1TSNGXCK5MJN3HYMWRCBVM2',
              idamercado_c: '01H1TSNGXCW5F7BM2MMRP49H9P',
              idregional_c: '01H1TSNGXD6BFTPZ1G61PG1P67',
              idgrupocliente_c: '01H1TSNGXERV4BH4Z3AQFB1G3T',
            },
          ],
          total: 14,
        };

        this.data_table.rows = data?.rows;
        this.pagination.rowsNumber = data?.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async reloadList() {
      await this.getListProductType({
        pagination: this.pagination,
        filter: this.data_filter,
      });
    },

    async setPagination(pagination: PaginationTable) {
      if (
        this.mongo_id &&
        (pagination.rowsPerPage !== this.pagination.rowsPerPage ||
          pagination.sortBy !== this.pagination.sortBy ||
          pagination.descending !== this.pagination.descending)
      ) {
        // await updateTablePreferences(this.mongo_id ?? '', {
        //   pagination: {
        //     sortBy: pagination.sortBy,
        //     descending: pagination.descending,
        //     rowsPerPage: pagination.rowsPerPage,
        //   },
        // });
        this.pagination.sortBy = pagination.sortBy;
        this.pagination.rowsPerPage = pagination.rowsPerPage;
        this.pagination.descending = pagination.descending;
      }
    },

    async setVisibleColumn(columns: string[]) {
      // await updateTablePreferences(this.mongo_id ?? '', {
      //   visible_columns: columns,
      // });
      this.visible_columns = columns;
    },

    async setVisibleField(columns: string[]) {
      // await updateTablePreferences(this.mongo_id ?? '', {
      //   visible_fields: columns,
      // });
      this.visible_fields = columns;
    },

    async setFilterData() {
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${this.mongo_id}`,
          {
            data_filter: this.data_filter,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    async deleteMultiple(selectItems: { id: string }[]) {
      this.loading = true;

      try {
        const dataSend = {
          user_id: userCRM.id,
          items: selectItems,
        };
        // await deleteMassiveData(dataSend);
        await this.reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${
            selectItems.length > 1
              ? `Se eliminaron ${selectItems.length} registros de la tabla.`
              : 'Se eliminó un registro de la tabla.'
          }`
        );
      } catch (error) {
        Notification(
          'negative',
          'warning',
          '<strong> Ops! algo salió mal </strong> <br/>Ocurrió un error al eliminar los datos.'
        );
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateMultiple(
      data: UpdateMassiveModel,
      selectItems: { id: string }[]
    ) {
      this.loading = true;

      try {
        const dataSend = {
          items: selectItems,
          data_update: {
            ...data,
            user_id: userCRM.id,
          },
        };
        // await updateMassiveData(dataSend);
        await this.reloadList();
        Notification(
          'positive',
          'check_circle',
          `<strong> Acción exitosa¡ </strong> <br/> ${
            selectItems.length > 1
              ? `Se actualizaron ${selectItems.length} registros de la tabla.`
              : 'Se actualizó un registro de la tabla.'
          }`
        );
      } catch (error) {
        Notification(
          'negative',
          'warning',
          '<strong> Ops! algo salió mal </strong> <br/>Ocurrió un error al eliminar los datos.'
        );
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async clearFilterData() {
      this.data_filter = {
        nombre: '',
        iddivision_c: '',
        idamercado_c: '',
        idregional_c: '',
        idgrupocliente_c: '',
        created_by: [],
        modified_by: [],
        assigned_to: [],
        creation_date: { from: '', to: '', operator: '', option: '' },
      };
      try {
        await axios_PREFERENCES.patch(
          `/tables-users-preferences/${this.mongo_id}`,
          {
            data_filter: this.data_filter,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
