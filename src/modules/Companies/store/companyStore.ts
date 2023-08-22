import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import { Notification } from 'src/composables';
import {
  createChildCompany,
  createCompany,
  getCompanyUsers,
  getOneCompany,
  updateCompany,
  getCompanyChild,
  //getOneChildCompany,
  getCompanyChildrenUsers,
  getCompanyDocuments,
  getVersions,
  deleteDocumentCompany,
  getLastVersionDocument,
  deleteDocumentVersion,
  getDocument,
  updateDocument
} from '../services/useCompanyService';
import type { ChildCompany, Company } from '../utils/types';

//! Borrar datos falsos si no se usan
// import { childCompanies } from '../utils/dummyData';
import { getCategoryDocuments, getTypeDocuments } from '../services/useCompanyService';
//import { axios_NS_07 } from 'src/conections/axiosCRM';

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
    resolucion_ministerial_date_c: '',
    identificacion_fiscal_c: '',
    phone_office: '',
    phone_alternate: '',
    website: '',
    ownership: '', //nombre de propietario
    assigned_user_id: '', //responsable
    user_id_c:'', //id de propietario
    user_id: userCRM.id, //creado y modificado por
  });

  const childPayload = ref({} as ChildCompany);

  //getters
  const cardInfo = computed(() => {
    return {
      name: payload.value.name,
      razon_social_c: payload.value.razon_social_c,
      resolucion_ministerial_c: payload.value.resolucion_ministerial_c,
      resolucion_ministerial_date_c: payload.value.resolucion_ministerial_date_c,
      identificacion_fiscal_c: payload.value.identificacion_fiscal_c,
      user_id: payload.value.user_id,
      user_id_c: payload.value.user_id_c,
      assigned_user_id: payload.value.assigned_user_id,
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
    //console.log(payload.value.assigned_user_id);
    return payload.value.user_id_c;
  });

  //actions
  const onCreateCompany = async (
    dataCompany: Company,
    //dataDocuments: any[]
  ) => {
    const data = {...dataCompany, user_id:userCRM.id}; 
    try {
      Loading.show({
        message: 'Guardando informacion',
      });
      const response = await createCompany(data);
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
    dataCompany: ChildCompany
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
      data.user_id = userCRM.id;
      
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
      //console.log(response.assigned_user_id);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar el tipo de producto');
    } finally {
      loading.value = false;
    }
  };

  const onGetLastVersionDocument = async(id:string) =>{
    try{
      const response = await getLastVersionDocument(id);
      return response.last_version;
    }
    catch(e){
      throw e;
    }
  }

  const formatoFecha = (fecha:string, formato:number)=>{
    let fecha_result = ''
    if(formato == 1){
      const fecha_aux = fecha.substring(0, 10);
      const aux = fecha_aux.split('-');
      fecha_result =  `${aux[2]}/${aux[1]}/${aux[0]}`;
    }
    else{
      fecha_result = fecha;
    }
    return fecha_result
}

  // const onGetChildCompanies = async (id: string) => {
  //   try {
  //     // obtener datos del servicio
  //     return childCompanies;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const onGetListCompaniesChild = async (id: string) => {
    try {
      const data = await getCompanyChild(id);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const onGetCompanyUsers = async (id: string, filter:string) => {
    try {
      const users = await getCompanyUsers(id, filter);
      return users;
    } catch (error) {
      throw error;
    }
  };

  const onGetUsersFromChildCompany = async (id: string, filter:string) => {
    try {
      const users = await getCompanyChildrenUsers(id, filter);
      return users;
    } catch (error) {
      throw error;
    }
  };

  const onGetCompanyDocuments = async (id: string, child:boolean) => {
    try {
      // obtener documentos como array
      const documents = await getCompanyDocuments(id, child)
      return documents;
      //return [];
    } catch (error) {
      throw error;
    }
  };

  const onGetCategoryDocuments = async () => {
    try {
      const categories = await getCategoryDocuments();
      return categories;
    } catch (error) {
      throw error;
    }
  };

  const onGetTypeDocuments = async () => {
    try {
      const types = await getTypeDocuments();
      return types;
    } catch (error) {
      throw error;
    }
  };

  const onGetVersions = async(id:string)=>{
    try{
      const versions = await getVersions(id);
      //console.log(versions);
      return versions;
    }
    catch(e){
      throw (e)
    }
  }

  const onDeleteDocumentCompany = async(documentId:string, companyId:string, child:boolean)=>{
    try{
      const dataSend = {
        user_id: userCRM.id,
        documentId,
        companyId, 
        child
      };
      await deleteDocumentCompany(dataSend);
      Notification(
        'positive',
        'check_circle',
        `<strong> Acción exitosa¡ </strong> <br/> Se eliminó un registro de la tabla`
      );
    }
    catch(e){
      throw e;
    }
  }

  const onDeleteDocumentVersion = async(idVersion:string)=>{
    try{
      await deleteDocumentVersion(idVersion);
      Notification(
        'positive',
        'check_circle',
        `<strong> Acción exitosa¡ </strong> <br/> Se eliminó la versión`
      );
    }
    catch(e){

    }
  }

  const onGetDocument = async (id:string)=>{
    try{
      const response = await getDocument(id);
      return response;
    }
    catch(e){
      throw e;
    }
  }

  const onUpdateDocument = async(id:string, data:any)=>{
    try{
      const response = await updateDocument(id, data);
      return response;
    }
    catch(e){
      throw e;
    }
  }

  const clearData = () => {
    payload.value = {
      id: '',
      name: '',
      razon_social_c: '',
      direccion_c: '',
      email1: '',
      resolucion_ministerial_c: '',
      resolucion_ministerial_date_c: '',
      identificacion_fiscal_c: '',
      phone_office: '',
      phone_alternate: '',
      website: '',
      ownership: '',
      user_id_c: '',
      user_id: userCRM.id,
      assigned_user_id: '',
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
    //onGetChildCompanies,
    onGetCompanyUsers,
    onGetCompanyDocuments,
    onGetListCompaniesChild,
    onGetUsersFromChildCompany,
    onGetCategoryDocuments,
    onGetTypeDocuments,
    onGetVersions,
    onDeleteDocumentCompany,
    onGetLastVersionDocument,
    formatoFecha,
    onDeleteDocumentVersion,
    onGetDocument,
    onUpdateDocument
  };
});
