import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import {
  createCertificationRequest,
  getCertificationRequest,
  updateCertificationRequest,
  deleteCertificationRequest,
} from '../services/useCertificationsService';
import { Certification } from '../utils/types';

//! Borrar datos falsos si no se usan
// import { childCompanies, defaultData, users } from '../utils/dummyData';

const { userCRM } = userStore();

export const useCertificationStore = defineStore('certification-store', () => {
  //states
  const loading = ref(false);
  const payload = ref({
    id: '',
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
    comentario_creacion: '',
    aprobacion: '',
    id_profesional_acreditado: '',
    date_register_misa: '',
    date_aprox_cert: '',
    date_certif: '',
    observacion: '',
    comentario_observacion: '',
    id_empresa: '',
    assigned_user_id: '',
  });

  //getters
  // const cardInfo = computed(() => {
  //   return {
  //     name: payload.value.name,
  //     razon_social_c: payload.value.razon_social_c,
  //     resolucion_ministerial_c: payload.value.resolucion_ministerial_c,
  //     identificacion_fiscal_c: payload.value.identificacion_fiscal_c,
  //     user_id_c: payload.value.user_id_c,
  //   };
  // });

  // const cardContact = computed(() => {
  //   return {
  //     website: payload.value.website,
  //     email1: payload.value.email1,
  //     phone_office: payload.value.phone_office,
  //     phone_alternate: payload.value.phone_alternate,
  //   };
  // });

  // const cardAddress = computed(() => {
  //   return {
  //     address_street_generated_c: payload.value.direccion_c,
  //     latitude: 0,
  //     longitude: 0,
  //   };
  // });

  const cardOwner = computed(() => {
    //console.log(payload.value.assigned_user_id);
    return payload.value.assigned_user_id;
  });

  //actions
  const onCreateCertificationRequest = async (data: Certification) => {
    try {
      Loading.show({
        message: 'Guardando información',
      });
      await createCertificationRequest(data);
      // return response;
    } catch (error) {
      throw error;
    } finally {
      Loading.hide();
    }
  };

  const onGetCertificationRequest = async (id: string) => {
    try {
      loading.value = true;
      await getCertificationRequest(id);
      // return response
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const onUpdateCertificationRequest = async (
    id: string,
    data: Partial<Certification>
  ) => {
    try {
      Loading.show({
        message: 'Actualizando información',
      });
      await updateCertificationRequest(id, data);
      // return response;
    } catch (error) {
      throw error;
    } finally {
      Loading.hide();
    }
  };

  const onDeleteCertificationRequest = async (id: string) => {
    try {
      Loading.show({
        message: 'Eliminando Información',
      });
      await deleteCertificationRequest(id);
      // return response
    } catch (error) {
      throw error;
    } finally {
      Loading.hide();
    }
  };

  const clearData = () => {
    payload.value = {
      id: '',
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
      comentario_creacion: '',
      aprobacion: '',
      id_profesional_acreditado: '',
      date_register_misa: '',
      date_aprox_cert: '',
      date_certif: '',
      observacion: '',
      comentario_observacion: '',
      id_empresa: '',
      assigned_user_id: '',
    };
  };

  return {
    //states
    payload,
    //getter
    cardOwner,
    //actions
    onCreateCertificationRequest,
    onGetCertificationRequest,
    onUpdateCertificationRequest,
    onDeleteCertificationRequest,
    clearData,
  };
});
