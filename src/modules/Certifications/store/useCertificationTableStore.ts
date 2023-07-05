import { defineStore } from 'pinia';
import {
  Filter,
  Pagination,
  PaginationTable,
  UpdateMassiveModel,
} from '../utils/types';
import {
  updateMassiveData,
  deleteMassiveData,
  getTableData,
  getTablePreferences,
  saveTablePreferences,
  updateTablePreferences,
} from '../services/useCertificationsService';
import { axios_PREFERENCES } from 'src/conections/axiosCRM';
import { Notification } from 'src/composables';
import { userStore } from 'src/modules/Users/store/UserStore';

const { userCRM } = userStore();

export const useCertificationsTableStore = defineStore('certification_table', {
  state: () => ({
    loading: false,
    mongo_id: '',
    pagination: {
      page: 1,
      sortBy: 'fecha_creacion',
      descending: true,
      rowsPerPage: 15,
      rowsNumber: 10,
    },
    data_filter: {
      nro_solicitud: '',
      etapa: '',
      estado: '',
      tipo_tramite: '',
      id_solicitante: '',
      id_producto: '',
      id_tipo_producto: '',
      iddivision_c: '',
      idamercado_c: '',
      idregional_c: '',
      grupocliente_c: '',
      date_entered: '',
      cod_productos: '',
      aprobacion: '',
      id_profesional_acreditado: '',
      date_register_misa: '',
      date_aprox_cert: '',
      date_certif: '',
      comentario_observacion: '',
      id_empresa: '',
      created_by: [],
      modified_by: [],
      assigned_to: [],
      creation_date: { from: '', to: '', operator: '', option: '' },
    },
    data_table: {
      rows: [],
      columns: [
        {
          name: 'nro_solicitud',
          align: 'left',
          label: 'Nro de solicitud',
          field: 'nro_solicitud',
          sortable: true,
          visible: true,
        },
        {
          name: 'etapa',
          align: 'center',
          label: 'Etapa',
          field: 'etapa',
          sortable: true,
          visible: true,
        },
        {
          name: 'tipo_tramite',
          align: 'left',
          label: 'Tipo de tramite',
          field: 'tipo_tramite',
          sortable: true,
          visible: true,
        },
        {
          name: 'delegate',
          align: 'left',
          label: 'Responsable',
          field: 'id_profesional_acreditado',
          sortable: true,
          visible: true,
        },
        {
          name: 'id_producto',
          align: 'left',
          label: 'Producto',
          field: 'id_producto',
          sortable: true,
          visible: true,
        },
        {
          name: 'id_tipo_producto',
          align: 'center',
          label: 'Tipo de producto',
          field: 'id_tipo_producto',
          sortable: true,
          visible: true,
        },
        {
          name: 'aprobacion',
          align: 'center',
          label: 'Cumplimiento de requisitos',
          field: 'aprobacion',
          sortable: true,
          visible: true,
        },
        {
          name: 'id',
          align: 'center',
          label: 'Certificación',
          field: 'id',
          sortable: true,
          visible: true,
        },
      ],
    },
    visible_fields: [
      'nro_solicitud',
      'etapa',
      'tipo_tramite',
      'id_producto',
      'id_tipo_producto',
      'aprobacion',
      'id',
    ],
    visible_columns: [
      'nro_solicitud',
      'etapa',
      'tipo_tramite',
      'id_producto',
      'delegate',
      'id_tipo_producto',
      'aprobacion',
      'id',
    ],
  }),
  actions: {
    async getUserConfig() {
      const configuration = await getTablePreferences();
      if (configuration) {
        this.mongo_id = configuration._id;
        this.pagination.rowsPerPage = configuration.pagination.rowsPerPage;
        this.pagination.sortBy = configuration.pagination.sortBy;
        this.pagination.descending = configuration.pagination.descending;

        this.visible_columns = configuration.visible_columns;
        this.data_filter = configuration.data_filter;
        this.visible_fields = configuration.visible_fields;
      } else {
        this.mongo_id = await saveTablePreferences({
          pagination: this.pagination,
          visible_columns: this.visible_columns,
          data_filter: this.data_filter,
          visible_fields: this.visible_fields,
        });
      }
    },

    async getListCertifications(props: {
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
        const data = await getTableData(params);
        this.data_table.rows = data;
        this.pagination.rowsNumber = data.length;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async reloadList() {
      await this.getListCertifications({
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
        await updateTablePreferences(this.mongo_id ?? '', {
          pagination: {
            sortBy: pagination.sortBy,
            descending: pagination.descending,
            rowsPerPage: pagination.rowsPerPage,
          },
        });
        this.pagination.sortBy = pagination.sortBy;
        this.pagination.rowsPerPage = pagination.rowsPerPage;
        this.pagination.descending = pagination.descending;
      }
    },

    async setVisibleColumn(columns: string[]) {
      await updateTablePreferences(this.mongo_id ?? '', {
        visible_columns: columns,
      });
      this.visible_columns = columns;
    },

    async setVisibleField(columns: string[]) {
      await updateTablePreferences(this.mongo_id ?? '', {
        visible_fields: columns,
      });
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
        await deleteMassiveData(dataSend);
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
        await updateMassiveData(dataSend);
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
        nro_solicitud: '',
        etapa: '',
        estado: '',
        tipo_tramite: '',
        id_solicitante: '',
        id_producto: '',
        id_tipo_producto: '',
        iddivision_c: '',
        idamercado_c: '',
        idregional_c: '',
        grupocliente_c: '',
        date_entered: '',
        cod_productos: '',
        aprobacion: '',
        id_profesional_acreditado: '',
        date_register_misa: '',
        date_aprox_cert: '',
        date_certif: '',
        comentario_observacion: '',
        id_empresa: '',
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
