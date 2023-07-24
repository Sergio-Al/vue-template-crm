import { amercado } from './../utils/dummyData';
import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import moment from 'moment';
import {
  createCertificationRequest,
  getCertificationRequest,
  updateCertificationRequest,
  deleteCertificationRequest,
} from '../services/useCertificationsService';
import { Certification, CertificationDB } from '../utils/types';

//! Borrar datos falsos si no se usan
// import { childCompanies, defaultData, users } from '../utils/dummyData';

const { userCRM } = userStore();

export const useCertificationStore = defineStore('certification-store', () => {
  //states
  const loading = ref(false);
  const payload = ref<CertificationDB>({
    id: '',
    name: '',
    etapa_c: '',
    estado_c: '',
    tipo_tramite_c: '',
    user_id_c: '',
    producto_c: '',
    tipo_producto_c: '',
    iddivision_c: '',
    idamercado_c: '',
    idregional_c: '',
    date_entered: moment().format('DD/MM/YYYY'),
    comentario_solicitud_c: '',
    estado_aprobacion_c: '',
    user_id1_c: '',
    date_register_misa_c: '',
    date_planning_cert_c: '',
    date_real_cert_c: '',
    description: '',
    hance_empresa_id_c: '',
    assigned_user_id: '',
    correo_fabricante_c: '',
    telefono_fabricante_c: '',
    date_modified: '',
    modified_user_id: '',
    created_by: '',
    deleted: '',
    referencia_prods: '',
    cod_productos_c: '',
    cod_misa_c: '',
    nro_ruta_c: '',
    fabricante_c: '',
    contact_fabricante_c: '',
  });

  //getters
  const cardApplicant = computed(() => {
    const {
      user_id_c, // solicitante
      date_entered,
      idamercado_c,
      iddivision_c,
      idregional_c,
    } = payload.value;

    return {
      user_id_c,
      date_entered,
      iddivision_c,
      idamercado_c,
      idregional_c,
    };
  });

  const cardManufacturer = computed(() => {
    const {
      hance_empresa_id_c,
      user_id1_c,
      correo_fabricante_c,
      telefono_fabricante_c,
    } = payload.value;
    return {
      hance_empresa_id_c,
      user_id1_c,
      correo_fabricante_c,
      telefono_fabricante_c,
    };
  });

  const cardProduct = computed(() => {
    const { producto_c } = payload.value;

    return {
      producto_c,
      cod_productos_c: 'AARRDDX,AADFSDFE,SEFESFSEF,SSEFFEDF',
    };
  });
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
  const onCreateCertificationRequest = async (data: CertificationDB) => {
    try {
      Loading.show({
        message: 'Guardando información',
      });
      console.log('data desde store');
      console.log(data);
      const response = await createCertificationRequest(data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    } finally {
      Loading.hide();
    }
  };

  const onGetCertificationRequest = async (id: string) => {
    try {
      loading.value = true;
      const response = await getCertificationRequest(id);
      payload.value = response;
      return response;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const onUpdateCertificationRequest = async (
    id: string,
    data: Partial<CertificationDB>
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
      name: '',
      etapa_c: '',
      estado_c: '',
      tipo_tramite_c: '',
      user_id_c: '',
      producto_c: '',
      tipo_producto_c: '',
      iddivision_c: '',
      idamercado_c: '',
      idregional_c: '',
      date_entered: moment().format('DD/MM/YYYY'),
      comentario_solicitud_c: '',
      estado_aprobacion_c: '',
      user_id1_c: '',
      date_register_misa_c: '',
      date_planning_cert_c: '',
      date_real_cert_c: '',
      description: '',
      hance_empresa_id_c: '',
      assigned_user_id: '',
      correo_fabricante_c: '',
      telefono_fabricante_c: '',
      date_modified: '',
      modified_user_id: '',
      created_by: '',
      deleted: '',
      referencia_prods: '',
      cod_productos_c: '',
      cod_misa_c: '',
      nro_ruta_c: '',
      fabricante_c: '',
      contact_fabricante_c: '',
    };
  };

  return {
    //states
    payload,
    //getter
    cardApplicant,
    cardManufacturer,
    cardProduct,
    cardOwner,
    //actions
    onCreateCertificationRequest,
    onGetCertificationRequest,
    onUpdateCertificationRequest,
    onDeleteCertificationRequest,
    clearData,
  };
});
