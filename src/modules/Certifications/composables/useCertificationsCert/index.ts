import { storeToRefs } from 'pinia';
import { useCertificationsCertStore } from '../../store/useCertificationsCertStore';

const certificationsStore = useCertificationsCertStore();
const tableState = storeToRefs(certificationsStore);
const { setVisibleColumn, getListCertifications, reloadList, setPagination, clearFilterData } =
  certificationsStore;

export function useCertifications() {
  return {
    certificationsStore,
    setVisibleColumn,
    getListCertifications,
    reloadList,
    setPagination,
    clearFilterData
  };
}
