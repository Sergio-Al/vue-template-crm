import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import {
  createChildCompany,
  createCompany,
  getCompanyUsers,
  getOneCompany,
  updateCompany,
} from '../services/useCompanyService';
import type { ChildCompany, Company } from '../utils/types';

//! Borrar datos falsos si no se usan
import { childCompanies, defaultData, users } from '../utils/dummyData';

const { userCRM } = userStore();

export const useCompaniesStore = defineStore('companies-store', () => {
  //states
  const loading = ref(false);
  const payload = ref({
    id: '',
    name: '',
    razon_social_c: '',
    direccion_c: '',
    email1: '',
    resolucion_ministerial_c: '',
    identificacion_fiscal_c: '',
    phone_office: '',
    phone_alternate: '',
    website: '',
    ownership: '',
    assigned_user: '',
    user_id_c: userCRM.id,
  });

  const childPayload = ref({} as ChildCompany);

  //getters
  const cardInfo = computed(() => {
    return {
      name: payload.value.name,
      razon_social_c: payload.value.razon_social_c,
      resolucion_ministerial_c: payload.value.resolucion_ministerial_c,
      identificacion_fiscal_c: payload.value.identificacion_fiscal_c,
      user_id_c: payload.value.user_id_c,
    };
  });

  const cardContact = computed(() => {
    return {
      website: payload.value.website,
      email1: payload.value.email1,
      phone_office: payload.value.phone_office,
      phone_alternate: payload.value.phone_alternate,
    };
  });

  const cardAddress = computed(() => {
    return {
      address_street_generated_c: payload.value.direccion_c,
      latitude: 0,
      longitude: 0,
    };
  });

  const cardOwner = computed(() => {
    return payload.value.assigned_user;
  });

  //actions
  const onCreateCompany = async (
    dataCompany: Company,
    dataDocuments: any[]
  ) => {
    console.log('create');
    try {
      Loading.show({
        message: 'Guardando informacion',
      });
      const response = await createCompany(dataCompany);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar el tipo de producto');
    } finally {
      Loading.hide();
    }
  };

  const onCreateChildCompany = async (
    idParent: string,
    dataCompany: ChildCompany,
    dataDocuments: any[]
  ) => {
    try {
      Loading.show({
        message: 'Guardando Info',
      });
      const response = await createChildCompany(idParent, dataCompany);
      return response;
    } catch (error) {
      throw error;
    } finally {
      Loading.hide();
    }
  };

  const onUpdateCompany = async (id: string, data: any) => {
    try {
      Loading.show({
        message: 'Modificando informacion',
      });
      console.log(id);
      console.log(data);

      const response = await updateCompany(id, data);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar el tipo de producto');
    } finally {
      Loading.hide();
    }
  };

  const onGetCompany = async (id: string) => {
    console.log('get');
    try {
      loading.value = true;
      const response = await getOneCompany(id);
      payload.value = response;
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar el tipo de producto');
    } finally {
      loading.value = false;
    }
  };

  const onGetChildCompanies = async (id: string) => {
    try {
      // obtener datos del servicio
      return childCompanies;
    } catch (error) {
      throw error;
    }
  };

  const onGetCompanyUsers = async (id: string) => {
    try {
      // obtener array de usuarios
      console.log(id);
      const users = await getCompanyUsers(id);
      return users;
    } catch (error) {
      throw error;
    }
  };

  const onGetCompanyDocuments = async (id: string) => {
    try {
      // obtener documentos como array
      return defaultData;
    } catch (error) {
      throw error;
    }
  };

  const clearData = () => {
    payload.value = {
      id: '',
      name: '',
      razon_social_c: '',
      direccion_c: '',
      email1: '',
      resolucion_ministerial_c: '',
      identificacion_fiscal_c: '',
      phone_office: '',
      phone_alternate: '',
      website: '',
      ownership: '',
      user_id_c: userCRM.id,
    };
  };

  return {
    //states
    payload,
    childPayload,
    //getter
    cardInfo,
    cardContact,
    cardAddress,
    cardOwner,
    //actions
    onCreateCompany,
    onUpdateCompany,
    onGetCompany,
    clearData,
    onCreateChildCompany,
    onGetChildCompanies,
    onGetCompanyUsers,
    onGetCompanyDocuments,
  };
});
