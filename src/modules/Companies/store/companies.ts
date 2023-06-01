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

export const useCompaniesStore = defineStore('companies-store', {
  state: () => ({
    loading: false,
    mongo_id: '',
    pagination: {
      page: 1,
      sortBy: 'fecha_creacion',
      descending: true,
      rowsPerPage: 10,
      rowsNumber: 10,
    },
    data_filter: {
      account: '',
      name: '',
      pst_code: '',
      aio_code: '',
      status: '',
      start_date: '',
      end_date: '',
      country: '',
      state: '',
      city: '',
      created_by: [],
      modified_by: [],
      assigned_to: [],
      creation_date: { from: '', to: '', operator: '', option: '' },
    },
    data_table: {
      rows: [] as any,
      columns: [
        {
          name: 'id_empresa',
          align: 'left',
          label: 'id Empresa',
          field: 'id_empresa',
          sortable: true,
          visible: true,
        },
        {
          name: 'razon_social',
          align: 'left',
          label: 'Razón social',
          field: 'razon_social',
          sortable: true,
          visible: true,
        },
        {
          name: 'direccion',
          align: 'left',
          label: 'Dirección',
          field: 'direccion',
          sortable: true,
          visible: true,
        },

        {
          name: 'nro_resolucion_min',
          align: 'left',
          label: 'Nro. de Resolución Ministerial',
          field: 'nro_resolucion_min',
          sortable: true,
          visible: true,
        },
        {
          name: 'id_representante',
          align: 'left',
          label: 'Representante',
          field: 'id_representante',
          sortable: false,
          visible: true,
        },
      ],
    },
    visible_fields: [
      'account',
      'name',
      'status',
      'country',
      'created_by',
      'assigned_to',
    ],
    visible_columns: [
      'razon_social',
      'direccion',
      'nro_resolucion_min',
      'id_representante',
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

    async getListCompanies(props: { pagination: Pagination; filter: Filter }) {
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
              id_empresa: '3c8721ff-bb40-40bf-8ec2-92359fda4173',
              razon_social: 'Kerluke Inc',
              direccion: 'Suite 45',
              nro_resolucion_min: '56062-479',
              id_representante: '95b4318e-6463-4ef4-91f7-84a8736bdacb',
              nombre_representante: 'Jackie Cloney',
            },
            {
              id_empresa: 'f483cbf3-3f0a-4e91-aa66-d0f82087c419',
              razon_social: 'Windler Inc',
              direccion: 'Apt 432',
              nro_resolucion_min: '57520-0964',
              id_representante: '2fcaec70-392c-4498-97bf-58d3d7531055',
              nombre_representante: 'Clementine Cantera',
            },
            {
              id_empresa: 'da4baaeb-7872-43ad-8361-6e832cf3e48c',
              razon_social: 'Upton Inc',
              direccion: '16th Floor',
              nro_resolucion_min: '58930-063',
              id_representante: '87d59054-ffee-4cb7-ab11-17b9113dc5c7',
              nombre_representante: 'Georgie Thicking',
            },
            {
              id_empresa: 'da076854-815b-45f5-92a6-f205d17cf622',
              razon_social: 'Dickens-Lind',
              direccion: 'PO Box 33062',
              nro_resolucion_min: '43063-251',
              id_representante: '69ff6b03-8c76-4665-91d2-b1c1266cdf3d',
              nombre_representante: 'Ev Magnar',
            },
            {
              id_empresa: '036709f2-1722-41ec-8cec-5e7eaa07d88b',
              razon_social: 'Smith-Considine',
              direccion: 'PO Box 64231',
              nro_resolucion_min: '55312-466',
              id_representante: 'ed5d3950-e8d0-4f21-9215-fa80e3fd2b42',
              nombre_representante: 'Jill Jeff',
            },
            {
              id_empresa: '44a89878-eb2c-4ae2-a23d-bac5a0d1714f',
              razon_social: 'Ankunding-Schuster',
              direccion: 'Suite 56',
              nro_resolucion_min: '49738-458',
              id_representante: '3e4844d4-46e7-42bf-aec2-5a963cbda83d',
              nombre_representante: 'Tillie Exposito',
            },
            {
              id_empresa: 'ebcd0e14-1e55-4a44-a49a-3a8eeece34ca',
              razon_social: 'Cassin LLC',
              direccion: 'Apt 1398',
              nro_resolucion_min: '42549-503',
              id_representante: '01887e76-4812-4b8c-b00f-efcae70f5a6b',
              nombre_representante: 'Berry Glenfield',
            },
            {
              id_empresa: 'bb26d485-d82c-4fd7-9f77-66ce9be44e08',
              razon_social: 'Haag Inc',
              direccion: 'Suite 14',
              nro_resolucion_min: '0603-4246',
              id_representante: '3c00e917-2673-4bee-9111-9f87545de96a',
              nombre_representante: 'Alysa Staggs',
            },
            {
              id_empresa: '385671fb-2d87-4734-9cb1-d8ae53f9a948',
              razon_social: 'Schaefer-Waters',
              direccion: 'Suite 53',
              nro_resolucion_min: '76049-007',
              id_representante: '03eb7bc7-d833-469b-a77a-78f791683e3f',
              nombre_representante: 'Royall Perrelle',
            },
            {
              id_empresa: 'a6cb75c5-5265-4d63-8d6e-94e684295fcb',
              razon_social: "Oberbrunner, O'Reilly and DuBuque",
              direccion: 'PO Box 6554',
              nro_resolucion_min: '41250-425',
              id_representante: 'ef9fc0bd-fdcc-4bba-ac73-9b0679b2a1fd',
              nombre_representante: 'Clarke Hornig',
            },
            {
              id_empresa: 'b54bc91b-38e4-41de-ae40-0bce5693aadc',
              razon_social: 'Williamson-Homenick',
              direccion: 'Apt 24',
              nro_resolucion_min: '67046-275',
              id_representante: '56f01704-0180-43ff-9c19-9864fb998207',
              nombre_representante: 'Rosabella Maylott',
            },
            {
              id_empresa: '6cf90d16-8451-4629-889d-bf1e03864c55',
              razon_social: 'Cummerata and Sons',
              direccion: 'PO Box 24093',
              nro_resolucion_min: '51681-0001',
              id_representante: '49c1115d-9b17-46d2-b31c-705d07aa2c79',
              nombre_representante: 'Darius Pease',
            },
            {
              id_empresa: '96ec8ec1-4ae2-48b5-90e6-f17aa85b0b4e',
              razon_social: 'Larkin Group',
              direccion: '10th Floor',
              nro_resolucion_min: '41250-039',
              id_representante: 'bf3f8fa8-8512-4d26-b1f8-9b33256e6b3f',
              nombre_representante: 'Bar De Gregario',
            },
            {
              id_empresa: '45d783b2-037f-45ea-96bd-fd28bed1a310',
              razon_social: 'Nader-Walsh',
              direccion: 'Suite 92',
              nro_resolucion_min: '55312-248',
              id_representante: '891ff908-da0b-45ca-9cda-1b7babc8c6de',
              nombre_representante: 'Sofie Silveston',
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
      await this.getListCompanies({
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
        account: '',
        name: '',
        pst_code: '',
        aio_code: '',
        status: '',
        start_date: '',
        end_date: '',
        country: '',
        state: '',
        city: '',
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
