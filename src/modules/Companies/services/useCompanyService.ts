/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  axios_LB_01,
  axios_LB_04,
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
    console.log(params);
    // const { data } = await axios_NS_07.get('/empresas');
    const { data } = await axios_NS_07.get('/empresas');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyChild = async (id: string) => {
  console.log(id);
  try {
    const { data } = await axios_NS_07.get(`/participacion/parent/${id}`);
    // const { data } = await axios_NS_07.get(`/participacion/child/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTablePreferences = async () => {
  try {
    const { data } = await axios_PREFERENCES.get(
      `/tables-users-preferences?filter=${JSON.stringify({
        where: { module: 'Projects', user_id: userCRM.id },
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
      module: 'Projects',
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
    return data;
  } catch (error) {
    throw error;
  }
};

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
    const { data } = await axios_NS_07.get(`/participacion/child/${id}`);
    return data;
  } catch (error) {}
};

export const getOneCompany = async (id: string) => {
  try {
    const response = await axios_NS_07.get(`/empresas/${id}`);
    // const response = await axios_NS_07.get(`empresas/${id}`);
    console.log('service ', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCompanyUsers = async (id: string) => {
  try {
    const params = {
      division: '04',
    };
    const { data } = await axios_LB_01.get(
      `/users/division/amercado?params=${JSON.stringify(params)}`
    );

    // const data = await axios_NS_07.get('/user');
    return data.data;
  } catch (error) {
    return error;
  }
};

export const updateCompany = async (
  id: string,
  information: BasicInformation
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

    // descomentar y poner el endpoint para actualizar participantes
    // const response = await axios_NS_07.patch(`/empresas/${id}`, dataSend);
    // return response.data;
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
  // console.log('delete massive');
  // console.log(data);
  // return;
  try {
    data.items.forEach(async (element: any) => {
      await axios_NS_07.delete(`empresas/${element.id}`);
    });
    return;
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

export const getUsers2 = async (name: string) => {
  console.log('user');
  const { data } = await axios_NS_07.get('user', {
    params: {
      name,
    },
  });

  return data;
};

export const getUser = async (id: string) => {
  const { data } = await axios_NS_07.get(`/user/${id}`);
  return data;
};

export const assignUsersToCompany = async (id: string, userIds: string[]) => {
  const body = { id, users_id: userIds };
  // iniciar peticion al backend con body
};
