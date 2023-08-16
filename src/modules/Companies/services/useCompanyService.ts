/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  axios_LB_01,
  axios_LB_05,
  axios_GLOBAL,
  axios_NS_07,
  axios_PREFERENCES,
} from 'src/conections/axiosCRM';
import { axios_rep_01 } from '../../../conections/axiosPRY';
import {
  BasicInformation,
  ChildCompany,
  Company,
  Params,
  User,
  base,
} from '../utils/types';

import { userStore } from 'src/modules/Users/store/UserStore';
import {
  GuestsRecordResponse,
  RecordOptionsModel,
  SearchUser,
} from 'src/components/types';

const { userCRM } = userStore();

export const getTableData = async (params: Params) => {
  try {
    const { data } = await axios_NS_07.get(
      `/empresas?params=${JSON.stringify(params)}`
    );
    console.log(data);

    //const { data } = await axios_NS_07.get(`/empresas`, {params});
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDocuments = async (id: string, child:boolean) => {
  try {
    const { data } = await axios_NS_07.get(`/documentos/search/${child?'HANCE_EmpresaParticipacion':'HANCE_Empresa'}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyChild = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`/participacion/child/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
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

export const createCompany = async (
  dataCompany: Company
  // oportunities: ClientData
) => {
  try {
    const { data } = await axios_NS_07.post('/empresas', dataCompany);

    if(!!dataCompany.comment){
      const bodyComment = 
      {
        assigned_user_id:dataCompany.user_id,
        bean_id:data.id,
        bean_module:'HANCE_Empresa',
        created_by:dataCompany.user_id,
        description:dataCompany.comment,
        relevance:'medium',
        visualizacion_c:'interno'
      };
  
      await axios_GLOBAL.post('/comments-new', {comment:bodyComment});
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const getLastVersionDocument = async(id)=>{
  try{
    const { data } = await axios_NS_07.get(`/documentos/last-version/${id}`);
    //console.log(data[0]);
    return data[0];
  }
  catch(e){
    throw e;
  }
}

export const createChildCompany = async (
  idParent: string,
  dataCompany: ChildCompany
) => {
  try {
    // endpoint para empresas como participacion
    const body = {
      ...dataCompany,
      hance_empresa_id_c: idParent,
    } as ChildCompany;

    // example body
    // {
    //   name: 'dfasdfdas',
    //   razon_social_c: '',
    //   direccion_c: 'Av/ asdfasdf,| Z/ sadfasdf,| C/ asdfasd,| #. sadfasd_gnrtd',
    //   email1: 'asdfads',
    //   resolucion_ministerial_c: '',
    //   identificacion_fiscal_c: '',
    //   phone_office: 'asdfasd',
    //   phone_alternate: 'sadfsad',
    //   website: 'asdfasd',
    //   ownership: '',
    //   assigned_user_id: '',
    //   user_id_c: undefined,
    //   hance_empresa_id_c: ''
    // }

    const { data } = await axios_NS_07.post('/participacion', body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getOneChildCompany = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`/participacion/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOneCompany = async (id: string) => {
  try {
    const response = await axios_NS_07.get(`/empresas/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCompanyUsers = async (id: string, filter:any='') => {
  try {
    const { data } = await axios_NS_07.get(`empresas/list-users/${id}?params=${filter}`);

    return data;
  } catch (error) {
    return error;
  }
};

export const getCompanyChildrenUsers = async (id: string, filter:string) => {
  try {
    const { data } = await axios_NS_07.get(`/participacion/child-users/${id}?params=${filter}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateCompany = async (
  id: string,
  information: any
) => {
  try {
    const dataSend = {
      ...information,
    };
    const response = await axios_NS_07.patch(`/empresas/${id}`, dataSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateChildCompany = async (
  id: string,
  information: BasicInformation
) => {
  try {
    const dataSend = {
      ...information,
    };

    delete dataSend.id;
    delete dataSend.parentCompany;

    //console.log(dataSend);

    // TODO: descomentar y poner el endpoint para actualizar participantes
    const response = await axios_NS_07.patch(`/participacion/${id}`, dataSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountFilter = async (dataFilter: base) => {
  try {
    const { data } = await axios_rep_01.post('/filter/accounts', dataFilter);
    return data;
  } catch (error) {
    throw error;
  }
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

export const assignUsersToCompany = async (id: string, userIds: string[]) => {
  // iniciar peticion al backend con body
  const { data } = await axios_NS_07.patch(
    `user/multiple/${userIds.join(',')}`,
    {
      companyIdEmpresa: id,
    }
  );
  return data;
};

export const deleteUserFromCompany = async (data:any) => {
  try{
    const {child, userId, companyId} = data;
    const endpoint = child?`/participacion/user/${companyId}/${userId}`:`/empresas/user/${userId}`;
    axios_NS_07.delete(endpoint);
  }
  catch(e){
    throw e;
  }
};

export const deleteChildCompany = async (id: string) => {
  try {
    await axios_NS_07.delete(`/participacion/${id}`);
  } catch (error) {
    throw error;
  }
};

export const assignUsersToChildCompany = async (
  id: string,
  userIds: any
) => {
  try {
    await axios_NS_07.post(`/participacion/asignar/${id}`, {
      userIds,
    });
  } catch (error) {
    throw error;
  }
};

export const getCategoryDocuments = async () => {
  try {
    const { data } = await axios_LB_05.get('/lang-es-document-category-doms');
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

export const deleteDocumentCompany = async(data:any)=>{
  try{
    const endpoint = data.child?`/documentos/participacion`:`/documentos/companies`;
    await axios_NS_07.post(endpoint, data);
    return;
  }
  catch (error) {
    throw error;
  }
}

export const deleteDocumentVersion = async (idVersion:string)=>{
  try{
    await axios_NS_07.post(`/documentos/version-delete/${idVersion}`);
    return;
  }
  catch(e){
    throw e;
  }
}