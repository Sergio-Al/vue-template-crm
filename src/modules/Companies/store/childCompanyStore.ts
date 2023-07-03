import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import {
  getCompanyUsers,
  getOneChildCompany,
  createChildCompany,
  updateChildCompany,
} from '../services/useCompanyService';
import type { ChildCompany } from '../utils/types';

//! Borrar datos falsos si no se usan
import { defaultData } from '../utils/dummyData';

const { userCRM } = userStore();

export const useChildCompaniesStore = defineStore(
  'child-companies-store',
  () => {
    //states
    const loading = ref(false);
    const childPayload = ref<ChildCompany>({} as ChildCompany);

    //const data_table = ref([])

    //getters

    const cardOwner = computed(() => {
      //console.log(payload.value.assigned_user_id);
      return childPayload.value.assigned_user_id;
    });

    //actions

    const onCreateChildCompany = async (
      idParent: string,
      dataCompany: ChildCompany
      //dataDocuments: any[]
    ) => {
      // console.log(dataCompany);
      // return;
      try {
        Loading.show({
          message: 'Guardando Información',
        });
        const response = await createChildCompany(idParent, dataCompany);
        return response;
      } catch (error) {
        throw error;
      } finally {
        Loading.hide();
      }
    };

    const onUpdateChildCompany = async (id: string, data: any) => {
      try {
        Loading.show({
          message: 'Modificando informacion',
        });
        console.log(id);
        console.log(data);

        const response = await updateChildCompany(id, data);
        return response;
      } catch (error) {
        console.log(error);
        throw new Error('No se puede modificar la empresa participante');
      } finally {
        Loading.hide();
      }
    };

    const onGetChildCompany = async (id: string) => {
      try {
        loading.value = true;
        const response = await getOneChildCompany(id);
        // const response = {
        //   id: '1',
        //   name: 'Mipro',
        // } as ChildCompany;
        childPayload.value = response;
        return response;
      } catch (error) {
        console.log('error');
        throw error;
      } finally {
        loading.value = false;
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
      childPayload.value = {} as ChildCompany;
    };

    return {
      //states
      childPayload,
      //getter
      cardOwner,
      //actions
      onCreateChildCompany,
      onUpdateChildCompany,
      onGetChildCompany,
      clearData,
      onGetCompanyUsers,
      onGetCompanyDocuments,
    };
  }
);
