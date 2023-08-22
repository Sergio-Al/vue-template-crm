import { storeToRefs } from 'pinia';
import { useCertificationsRequestStore } from '../../store/useCertificationRequestStore';

const certificationsRequestStore = useCertificationsRequestStore();
const tableState = storeToRefs(certificationsRequestStore);
const { setVisibleColumn, getListCertifications, reloadList, setPagination } =
certificationsRequestStore;

export function useCertifications() {
  return {
    certificationsRequestStore,
    setVisibleColumn,
    getListCertifications,
    reloadList,
    setPagination,
  };
}
