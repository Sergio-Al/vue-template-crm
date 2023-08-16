import {
  axios_GLOBAL,
  axios_LB_04,
  axios_NS_07,
  axios_PREFERENCES,
} from 'src/conections/axiosCRM';

import { userStore } from 'src/modules/Users/store/UserStore';
import { axios_LB_01, axios_NS_07 } from 'src/conections/axiosCRM';
import type {
  Certification,
  CertificationDB,
  CertificationRequest,
  CertificacionBody,
  Manufacturer,
  Params,
  Product,
} from '../utils/types';
import {
  GuestsRecordResponse,
  RecordOptionsModel,
  SearchUser,
} from 'src/components/types';

import {
  certicationsList,
  user,
  certification,
  manufacturer,
  manufacturerContact,
  product,
  manufacturerFiltered,
  productsFiltered,
  certificationsRequestPromise,
  certificationsPromise,
  getUsersPromise,
  getEmpresaParticipacionPromise,
  createCertificationPromise,
} from '../utils/dummyData';

const { userCRM } = userStore();

export const updateMassiveData = async (data: any) => {
  try {
    await axios_NS_07.post('/certifications/update_mutiple', data);
  } catch (error) {
    throw error;
  }
};

export const updateStateCertificationRequest = async(id:string, state:string)=>{
  try{
    await axios_NS_07.patch(`/solicitud/state/${id}`, {estado_aprobacion_c:state});
    return;
  }
  catch(e){
    throw e;
  }
}

export const deleteMassiveData = async (data: any) => {
  try {
    // DEV-1 request
    // data.items.forEach(async (element: any) => {
    //   await axios_NS_07.delete(`certification-request/${element.id}`);
    // });

    // data.items.forEach(async (element: any) => {
      
    // });

    await axios_NS_07.post(`certificacion/delete-multiple`, data);
    return;
  } catch (error) {
    throw error;
  }
};

export const deleteMassiveDataRequest = async (data: any) => {
  try {
    // DEV-1 request
    // data.items.forEach(async (element: any) => {
    //   await axios_NS_07.delete(`certification-request/${element.id}`);
    // });

    // data.items.forEach(async (element: any) => {
      
    // });

    await axios_NS_07.post(`solicitud/delete-multiple`, data);

    return;
  } catch (error) {
    throw error;
  }
};

export const getTableData = async (params: Params) => {
  try {
    console.log(params);
    // DEV-1 request
    // const { data } = await axios_NS_07.get('/certification-request');
    // console.log(data);
    // return data

    //return await certificationsPromise();

    // return certicationsList;

    const { data } = await axios_NS_07.get(
      `/certificacion/advanced?params=${JSON.stringify(params)}`
    );
    //console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTablePreferences = async () => {
  try {
    const { data } = await axios_PREFERENCES.get(
      `/tables-users-preferences?filter=${JSON.stringify({
        where: { module: 'Certifications', user_id: userCRM.id },
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

/**
 * La funcion recibe los datos de la siguiente forma
 * @example
 * assigned_user_id: '1';
 * date_entered_c: '2023-07-15';
 * description: 'comentario de pruebas';
 * estado_c: 'pendiente';
 * etapa_c: 'nueva';
 * fabricante_c: 'Diamed';
 * idamercado_c: undefined;
 * iddivision_c: '04';
 * idregional_c: undefined;
 * producto_c: 'Agujas';
 * referencia_prods: 'adsfasdf,|aadsfadsf,|asdfadsf,|safasdf';
 * user_id_c: undefined;
 * @param solicitud_certification body de la nueva solicitud *ver ejemplo*
 * @returns la nueva solicitud con su id
 */
export const createCertificationRequest = async (
  solicitud_certification: Partial<CertificationRequest>
) => {
  solicitud_certification.estado_aprobacion_c = 'pending';
  const last_value = await getLastNumberCertificationRequest();
  const nro_cert = parseInt(last_value.split('/')[0]) + 1;
  solicitud_certification.name = `${nro_cert.toString()}/${new Date().getFullYear()}`;

  console.log(solicitud_certification);

  const { data } = await axios_NS_07.post(
    '/solicitud',
    solicitud_certification
  );

  const comment = {
    assigned_user_id: solicitud_certification.assigned_user_id,
    bean_id: data.id,
    bean_module: 'HANCE_SolicitudCertificacion',
    description: solicitud_certification.description,
    relevance: 'medium',
    visualizacion_c: 'interno',
    created_by: solicitud_certification.assigned_user_id,
  };
  console.log(comment);
  await axios_GLOBAL.post('/comments-new', { comment });
  //TODO: guardar comentario

  return data;
};

const getLastNumberCertificationRequest = async () => {
  try {
    const { data } = await axios_NS_07.get('/solicitud/last-number');
    return data[0].name;
  } catch (e) {
    throw e;
  }
};

export const createComment = async(userId:string, module:any, description:any, moduleId:string)=>{
  const comment = {
    assigned_user_id: userId,
    bean_id: moduleId,
    bean_module: module,
    description,
    relevance: 'medium',
    visualizacion_c: 'interno',
    created_by: userId,
  };
  try{
    await axios_GLOBAL.post(`/comments-new`, {comment});
    //console.log(data);
    //return;
  }
  catch(e){
    throw e
  }
}

export const getCertificationRequest = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`/solicitud/${id}`);
    console.log(data);
    //const { data } = await axios_NS_07.get(`/certification-request/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
  //console.log(response);
  // return certification;
};

export const getCertificationRequestCustomized = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`/solicitud/customized/${id}`);
    console.log(data);
    //const { data } = await axios_NS_07.get(`/certification-request/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
  //console.log(response);
  // return certification;
};

export const getCertification = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`/certificacion/${id}`);
    //const { data } = await axios_NS_07.get(`/certification-request/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
  //console.log(response);
  // return certification;
};

/**
 * Actualiza la informacion con el siguiente formato:
 * @example
 * id: '22343',
 * assigned_user_id: '1';
 * date_entered_c: '2023-07-15';
 * description: 'comentario de pruebas';
 * estado_c: 'pendiente';
 * etapa_c: 'nueva';
 * fabricante_c: 'Diamed';
 * idamercado_c: undefined;
 * iddivision_c: '04';
 * idregional_c: undefined;
 * producto_c: 'Agujas';
 * referencia_prods: 'adsfasdf,|aadsfadsf,|asdfadsf,|safasdf';
 * user_id_c: undefined;
 * @param id id de la solicitud
 * @param body body de la solicitud ver ejemplo
 * @returns los datos actualizados
 */
export const updateCertificationRequest = async (
  id: string,
  body: Partial<CertificationRequest>
) => {
  try {
    // DEV-1 request
    console.log(body);
    const { data } = await axios_NS_07.patch(`solicitud/${id}`, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCertificationRequest = async (id: string) => {
  try {
    // DEV-1 request
    const { data } = await axios_NS_07.delete(`solicitud/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await axios_NS_07.get(`users/${id}`);
    //console.log(response);
    // const response = {
    //   id: '25e1d045-64e8-60d1-4ba0-63d81c7bb46c',
    //   fullname: 'Erik',
    // };
    return data;

    //return user;
  } catch (error) {}
};

export async function getUsers(
  value: string,
  options: RecordOptionsModel = {}
): Promise<SearchUser[]> {
  // const {
  //   module = '',
  //   user_iddivision = '',
  //   user_idamercado = '',
  //   user_idgrupocliente = '',
  // } = options;
  // const formattedModule = module.charAt(0).toUpperCase() + module.slice(1);
  // const bodyOptions = {
  //   value,
  //   module: formattedModule,
  //   user_iddivision,
  //   user_idamercado,
  //   user_idgrupocliente,
  // };
  try {
    // return await getUsersPromise();
    
    // const { data } = await axios_LB_04.patch<GuestsRecordResponse>(
    //   '/search-user-mitings/1/100/desc/{val}',
    //   bodyOptions
    // );

    // return data.search_users;
    const { data } = await axios_NS_07.get<SearchUser[]>('/users', {
      params: {
        name: value,
        idCompany: '139c3fdd-c676-3071-b88c-64b0022b6839',
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getParticipants = async (idUser: string) => {
  //devuelve las empresas y subempresas en donde participa el usuario
  //return await getEmpresaParticipacionPromise();
  try{
    const {data} = await axios_NS_07.get(`/users/companies/${idUser}`);
    return data;
  }
  catch(e){
    throw e;
  }
};

export const getManufacturer = async (id: string) => {
  const { data } = await axios_NS_07.get(`/proveedor/${id}`)
  // return response;
  return data;
};

export const getManufacturerContact = async (id: string) => {
  // const response = await axios_NS07(`/manufacturer-contact/${id}`)
  // return response;
  return manufacturerContact;
};

export const getProduct = async (id: string) => {
  // const response = await axios_NS07(`/product/${id}`)
  // return response;
  return product;
};

export const getManufacturers = async (params: Partial<Manufacturer>) => {
  // console.log(params);
  // console.log(manufacturerFiltered);
  // return manufacturerFiltered;

  try {
    const { data } = await axios_NS_07.get(
      `proveedor/advanced?params=${JSON.stringify(params)}`
    );
    //console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};


export const getProducts = async (params: Partial<Product>) => {
  console.log(params);
  return productsFiltered;
};

export const getCertificationRequests = async (params: any) => {
  try {
    const { data } = await axios_NS_07.get(
      `/solicitud/advanced?params=${JSON.stringify(params)}`
    );
    console.log(data);
    return data;
    //return await certificationsRequestPromise();
    //obtener listado de solicitudes
  } catch (error) {
    throw error;
  }
};

export const createCertificationService = async (
  body: Partial<CertificacionBody>
) => {
  console.log(body);
  return await createCertificationPromise();
};

export const getLastSchema = async(base:string)=>{
  const type = 'HANCE_Certificacion';
  try{
    const { data } = await axios_NS_07.get(`esquemadoc/last_schema/${type}/${base}`);
    return data[0];
  }
  catch(e){
    throw e;
  }
}

export const getDocumentsSchema = async (id:string)=>{
  try{
    const { data } = await axios_NS_07.get(`esquemadoc/documents_schema/${id}`)
    return data;
  }
  catch(e){
    throw e;
  }
}