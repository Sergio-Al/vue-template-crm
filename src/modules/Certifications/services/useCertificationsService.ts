import { axios_NS_07, axios_PREFERENCES } from 'src/conections/axiosCRM';

import { userStore } from 'src/modules/Users/store/UserStore';
import type { Certification, Params } from '../utils/types';

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
    const { data } = await axios_NS_07.get('/certifications');
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
  return;
};

export const getCertificationRequest = async (id: string) => {
  return;
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
