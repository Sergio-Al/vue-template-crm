import {
  axios_LB_04,
  axios_NS_07,
  axios_PREFERENCES,
} from 'src/conections/axiosCRM';

import { userStore } from 'src/modules/Users/store/UserStore';
import type {
  Certification,
  CertificationDB,
  CertificationRequest,
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
} from '../utils/dummyData';

const { userCRM } = userStore();

export const updateMassiveData = async (data: any) => {
  try {
    await axios_NS_07.post('/certifications/update_mutiple', data);
  } catch (error) {
    throw error;
  }
};

export const deleteMassiveData = async (data: any) => {
  try {
    // DEV-1 request
    data.items.forEach(async (element: any) => {
      await axios_NS_07.delete(`certification-request/${element.id}`);
    });
    // data.items.forEach(async (element: any) => {
    //   await axios_NS_07.delete(`certifications/${element.id}`);
    // });
    return;
  } catch (error) {
    throw error;
  }
};

export const getTableData = async (params: Params) => {
  console.log(params);
  try {
    // DEV-1 request
    // const { data } = await axios_NS_07.get('/certification-request');
    // console.log(data);
    // return data
    return await certificationsPromise();

    //return certicationsList;
    // const { data } = await axios_NS_07.get(
    //   `/certificacion?params=${JSON.stringify(params)}`
    // );
    // //console.log(data);
    // return data;
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
  console.log('Creacion de solicitud', solicitud_certification);
  solicitud_certification.etapa_c = 'nueva';
  solicitud_certification.estado_c = 'pendiente';

  // const { data } = await axios_NS_07.post(
  //   'certification-request',
  //   solicitud_certification
  // );

  console.log(solicitud_certification);

  const { data } = await axios_NS_07.post(
    '/solicitud',
    solicitud_certification
  );
  return data;
};

export const getCertificationRequest = async (id: string) => {
  try {
    const response = await axios_NS_07.get(`/solicitud/${id}`);
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
    const { data } = await axios_NS_07.patch(
      `certification-request/${id}`,
      body
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCertificationRequest = async (id: string) => {
  try {
    // DEV-1 request
    const { data } = await axios_NS_07.delete(`certification-request/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    // const response = await axios_NS07('user/id');
    const response = {
      id: '25e1d045-64e8-60d1-4ba0-63d81c7bb46c',
      fullname: 'Erik',
    };
    return response;

    return user;
  } catch (error) {}
};

export async function getUsers(
  value: string,
  options: RecordOptionsModel = {}
): Promise<SearchUser[]> {
  const {
    module = '',
    user_iddivision = '',
    user_idamercado = '',
    user_idgrupocliente = '',
  } = options;
  const formattedModule = module.charAt(0).toUpperCase() + module.slice(1);
  const bodyOptions = {
    value,
    module: formattedModule,
    user_iddivision,
    user_idamercado,
    user_idgrupocliente,
  };
  try {
    const { data } = await axios_LB_04.patch<GuestsRecordResponse>(
      '/search-user-mitings/1/100/desc/{val}',
      bodyOptions
    );
    return data.search_users;
  } catch (error) {
    throw error;
  }
}

export const getManufacturer = async (id: string) => {
  // const response = await axios_NS07(`/manufacturer/${id}`)
  // return response;
  return manufacturer;
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
    console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getProducts = async (params: Partial<Product>) => {
  console.log(params);
  return productsFiltered;
};

/**
 * Funcion que obtiene la lista de las solicitudes de certificados
 * @returns Lista de las solicitudes de certificado
 */
export const getCertificationRequests = async (params: Params) => {
  try {
    // const { data } = await axios_NS_07.get(
    //   `/certificacion?params=${JSON.stringify(params)}`
    // );

    // retornando datos falsos
    return await certificationsRequestPromise();
  } catch (error) {
    throw error;
  }
};
