import { defineStore } from 'pinia';

import { Loading } from 'quasar';
import { userStore } from 'src/modules/Users/store/UserStore';
import { computed, ref } from 'vue';
import { Notification } from 'src/composables';
import type { Manufacturer } from '../utils/types';
import {
  createManufacturer,
  getManufacturer,
  updateManufacturer,
  getVersions,
  deleteDocument,
  getDocuments,
  getLastVersionDocument,
  getDocument,
  updateDocument, 
  getTypeDocuments,
  getCategoryDocuments,
  deleteDocumentVersion
} from '../services/useManufacturerService';


const { userCRM } = userStore();

export const useManufacturerStore = defineStore('manufacturer-store', () => {
  //states
  const loading = ref(false);
  const payload = ref({
    id: '',
    name: '',
    billing_address_street: '',
    email1: '',
    phone_office: '',
    phone_alternate: '',
    website: '',
    ownership: '', //nombre de propietario
    assigned_user_id: '', //responsable
    user_id: userCRM.id, //creado y modificado por
  });

  //getters
  const cardInfo = computed(() => {
    return {
      name: payload.value.name,
      email1:payload.value.email1,
      user_id: payload.value.user_id,
      assigned_user_id: payload.value.assigned_user_id,
      phone_office:payload.value.phone_office,
      phone_alternate:payload.value.phone_alternate,
      website:payload.value.website,
      ownership:payload.value.ownership,
    };
  });

  //actions
  const onCreateManufacturer = async (
    dataManufacturer: Manufacturer,
    //dataDocuments: any[]
  ) => {
    const data = {...dataManufacturer, user_id:userCRM.id}; 
    try {
      Loading.show({
        message: 'Guardando informacion',
      });
      const response = await createManufacturer(data);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar al fabricante');
    } finally {
      Loading.hide();
    }
  };

  const onUpdateManufacturer = async (id: string, data: any) => {
    try {
      Loading.show({
        message: 'Modificando informacion',
      });
      data.user_id = userCRM.id;
      
      const response = await updateManufacturer(id, data);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede modificar el fabricante');
    } finally {
      Loading.hide();
    }
  };

  const onGetManufacturer = async (id: string) => {
    console.log('get');
    try {
      loading.value = true;
      const response:any = await getManufacturer(id);
      payload.value = response;
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede guardar el fabricante');
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


  const onGetDocuments = async (id: string, child:boolean) => {
    try {
      // obtener documentos como array
      const documents = await getDocuments(id, child)
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

  const onDeleteDocument = async(documentId:string, companyId:string, child:boolean)=>{
    try{
      const dataSend = {
        user_id: userCRM.id,
        documentId,
        companyId, 
        child
      };
      await deleteDocument(dataSend);
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
      email1: '',
      phone_office: '',
      phone_alternate: '',
      billing_address_street:'',
      website: '',
      ownership: '',
      user_id: userCRM.id,
      assigned_user_id: '',
    };
  };

  return {
    //states
    payload,
    //getter
    cardInfo,
    //actions
    onCreateManufacturer,
    onUpdateManufacturer,
    onGetManufacturer,
    clearData,
    onGetDocuments,
    onGetCategoryDocuments,
    onGetTypeDocuments,
    onGetVersions,
    onDeleteDocument,
    onGetLastVersionDocument,
    formatoFecha,
    onDeleteDocumentVersion,
    onGetDocument,
    onUpdateDocument
  };
});
