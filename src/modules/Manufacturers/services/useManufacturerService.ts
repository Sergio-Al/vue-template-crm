/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    axios_LB_01,
    axios_LB_05,
    axios_NS_07,
    axios_PREFERENCES,
  } from 'src/conections/axiosCRM';
  import { axios_rep_01 } from '../../../conections/axiosPRY';
  import {
    //BasicInformation,
    Manufacturer,
    Params,
    //User,
  } from '../utils/types';
  
  import { userStore } from 'src/modules/Users/store/UserStore';
  import {
    SearchUser,
  } from 'src/components/types';
  
  const { userCRM } = userStore();
  
  export const getTableData = async (params: Params) => {
    // try {
    //   const { data } = await axios_NS_07.get(
    //     `/empresas?params=${JSON.stringify(params)}`
    //   );
    //   console.log(data);
  
    //   //const { data } = await axios_NS_07.get(`/empresas`, {params});
    //   return data;
    // } catch (error) {
    //   throw error;
    // }
  };
  
  export const getDocuments = async (id: string, child:boolean) => {
    // try {
    //   const { data } = await axios_NS_07.get(`/documentos/search/${child?'HANCE_EmpresaParticipacion':'HANCE_Empresa'}/${id}`);
    //   return data;
    // } catch (error) {
    //   throw error;
    // }
  };
  
  export const getTablePreferences = async () => {
    try {
      const { data } = await axios_PREFERENCES.get(
        `/tables-users-preferences?filter=${JSON.stringify({
          where: { module: 'Companies', user_id: userCRM.id },
          limit: 1,
        })}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const saveTablePreferences = async (data: any) => {
    try {
      const res = await axios_PREFERENCES.post('/tables-users-preferences', {
        //module: 'Projects',
        module: 'Certifications',
        user_id: userCRM.id,
        pagination: data.pagination,
        visible_columns: data.visible_columns,
        data_filter: data.data_filter,
        visible_fields: data.visible_fields,
      });
      return res.data._id;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateTablePreferences = async (id: string, data: any) => {
    try {
      await axios_PREFERENCES.patch(`/tables-users-preferences/${id}`, data);
    } catch (error) {
      throw error;
    }
  };
  
  export const createManufacturer = async (
    dataCompany: Manufacturer
    // oportunities: ClientData
  ) => {
    // try {
    //   const { data } = await axios_NS_07.post('/empresas', dataCompany);
  
    //   if(!!dataCompany.comment){
    //     const bodyComment = 
    //     {
    //       assigned_user_id:dataCompany.user_id,
    //       bean_id:data.id,
    //       bean_module:'HANCE_Empresa',
    //       created_by:dataCompany.user_id,
    //       description:dataCompany.comment,
    //       relevance:'medium',
    //       visualizacion_c:'interno'
    //     };
    
    //     await axios_GLOBAL.post('/comments-new', {comment:bodyComment});
    //   }
  
    //   return data;
    // } catch (error) {
    //   throw error;
    // }
  };
  
  export const getManufacturer = async (id: string) => {
    // try {
    //   const response = await axios_NS_07.get(`/empresas/${id}`);
    //   return response.data;
    // } catch (error) {
    //   return error;
    // }
  };
  
  export const updateManufacturer = async (
    id: string,
    information: any
  ) => {
    // try {
    //   const dataSend = {
    //     ...information,
    //   };
    //   const response = await axios_NS_07.patch(`/empresas/${id}`, dataSend);
    //   return response.data;
    // } catch (error) {
    //   throw error;
    // }
  };
  
  export const getContactsAccount = async (account_id: string) => {
    try {
      const { data } = await axios_LB_01.get(
        `/account_get_contacts/${account_id}`
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteMassiveData = async (data: any) => {
    try {
      await axios_NS_07.post(`empresas/delete-multiple`, data);
    } catch (error) {
      throw error;
    }
  };
  
  export const updateMassiveData = async (data: any) => {
    try {
      await axios_rep_01.post('/projects/update_mutiple', data);
    } catch (error) {
      throw error;
    }
  };
  
  export async function getUsers(
    value: string,
    //options: RecordOptionsModel = {}
    idCompany:string
  ): Promise<SearchUser[]> {
  
    // const {
    //   module = '',
    //   user_iddivision = '',
    //   user_idamercado = '',
    //   user_idgrupocliente = '',
    // } = options;
    //const formattedModule = module.charAt(0).toUpperCase() + module.slice(1);
    // const bodyOptions = {
    //   value,
    //   module: formattedModule,
    //   user_iddivision,
    //   user_idamercado,
    //   user_idgrupocliente,
    // };
    try {
      // const { data } = await axios_LB_04.patch<GuestsRecordResponse>(
      //   '/search-user-mitings/1/100/desc/{val}',
      //   bodyOptions
      // );
      // return data.search_users;
  
      if (!!value) {
        const { data } = await axios_NS_07.get<SearchUser[]>('/users', {
          params: {
            name: value,
            idCompany
          },
        });
        return data;
      }
      const { data } = await axios_NS_07.get(`empresas/list-users/${idCompany}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export const getUsersFilter = async (id: string, params: any) => {
    console.log(id)
    console.log(params)
    try {
      const { data } = await axios_NS_07.get(`/empresas/list-users/${id}`, {
        params: params.value,
      });
      //console.log(data);
      return data;
    } catch (e) {
      throw new Error();
    }
  };
  
  export const getUser = async (id: string) => {
    const { data } = await axios_NS_07.get(`/users/${id}`);
    return data[0];
  };

  export const getVersions = async(id:string)=>{
    try{
      const { data } = await axios_NS_07.get(
        `/documentos/versiones/${id}`
      );
      //console.log(data);
      return data; 
    }
    catch (error) {
      throw error;
    }
  }

  export const deleteDocument = async(data:any)=>{
    try{
      const endpoint = data.child?`/documentos/participacion`:`/documentos/companies`;
      await axios_NS_07.post(endpoint, data);
      return;
    }
    catch (error) {
      throw error;
    }
  }

  export const getLastVersionDocument = async(id:string)=>{
    try{
      const { data } = await axios_NS_07.get(`/documentos/last-version/${id}`);
      //console.log(data[0]);
      return data[0];
    }
    catch(e){
      throw e;
    }
  }

  export const getDocument = async(id:string)=>{
    try{
      const { data } = await axios_NS_07.get(`/documentos/${id}`);
      return data[0];
    }
    catch(e){
      throw e;
    }
  }

  export const updateDocument = async(id:string, item:any)=>{
    try{
      const { data } = await axios_NS_07.patch(`/documentos/${id}`, item);
      return data;
    }
    catch(e){
      throw e;
    }
  }
  
  export const getCategoryDocuments = async () => {
    try {
      const { data } = await axios_LB_05.get('/lang-es-document-category-doms');
      // await data.forEach((element:any)=>(delete element.id))
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getTypeDocuments = async () => {
    try {
      const { data } = await axios_LB_05.get(
        '/lang-es-document-template-type-doms'
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteDocumentVersion = async (idVersion:string)=>{
    try{
      await axios_NS_07.post(`/documentos/version-delete/${idVersion}`);
      return;
    }
    catch(e){
      throw e;
    }
  }
  

