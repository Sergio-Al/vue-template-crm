import {
  axios_LB_04,
  axios_NS_07,
  axios_PREFERENCES,
} from 'src/conections/axiosCRM';

import { userStore } from 'src/modules/Users/store/UserStore';
import type { Certification, Params } from '../utils/types';
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
    data.items.forEach(async (element: any) => {
      await axios_NS_07.delete(`certifications/${element.id}`);
    });
    return;
  } catch (error) {
    throw error;
  }
};

export const getTableData = async (params: Params) => {
  try {
    // const { data } = await axios_NS_07.get('/certifications');
    const data = certicationsList;
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

export const createCertificationRequest = async (
  certfication: Certification
) => {
  console.log('Creacion de solicitud', certfication);
  // const response = await axios_NS07('/certification', certification);
  // return response;

  return;
};

export const getCertificationRequest = async (id: string) => {
  // const response = await axios_NS07('/certification', certification);
  // return response;
  return certification;
};

export const updateCertificationRequest = async (
  id: string,
  data: Partial<Certification>
) => {
  return;
};

export const deleteCertificationRequest = async (id: string) => {
  return;
};

export const getUser = async (id: string) => {
  try {
    // const response = await axios_NS07('user/id');
    // return response

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
