<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

import { userStore } from 'src/modules/Users/store/UserStore';
//import type { Document } from '../../utils/types';
//import { axiosCRM3 } from 'src/conections/axiosPRY';
//import { axios_GLOBAL } from 'src/conections/axiosCRM';
import { createComment, updateStateCertificationRequest } from '../../services/useCertificationRequestService';

//import { dataFormatCRM3Basic } from 'src/conections/conexionCRM3';
//import { useCompaniesStore } from '../../store/companyStore';

interface Props {
  idSolicitud:string;
}

interface Emits {
  (e: 'update'): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const dataComment = ref<any>({comment:'', avoid:'yes'})

//const companyStore = useCompaniesStore();

const $q = useQuasar();
const { userCRM } = userStore();

onMounted(async () => {
  console.log('card')
//   const version = await companyStore.onGetLastVersionDocument(props.idDocument);
//   data.value.version = parseInt(version)+1;
});

// const data = ref({
//   ...props.data,
//   active_date: new Date().toISOString().substring(0, 10), // fecha actual
//   //version: ((!!props.data?.version ? +props.data?.version : 1) + 1).toString(), // nueva version
// } as Document);


const changeState = async()=>{
    try{
      let state = dataComment.value.avoid == 'yes'?'kept':'rejected';
       await updateStateCertificationRequest(props.idSolicitud, state);
       $q.notify({
           color: 'info',
           message: 'Solicitud de Certificación',
           caption: 'Se cambió el estado de la solicitud',
       })
    }
    catch(e){
       throw e
    }
}

const onSubmit = async () => {
  try{
    $q.loading.show({
        message: 'Actualizando...'
    })
    await changeState();
    await createComment(
      userCRM.id, 
      "HANCE_SolicitudCertificacion", 
      dataComment.value.comment, 
      props.idSolicitud
      );
  }
  catch(e){
    throw e
  }
  finally{
    emits('update');
    $q.loading.hide();
  }

};

</script>

<template>
  <q-card class="q-pa-sm" style="min-width: fit-content">
    <q-card-section class="text-h6">Realizar Observación</q-card-section>
    <q-separator class="q-mb-md" />
    <span class="q-mx-md">Indique los motivos de la observación o rechazo</span>
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <q-input
        class="col-12"
        v-model="dataComment.comment"
        outlined
        autogrow
        dense
        type="text"
        label="Observación"
      />
      <q-checkbox
        v-model="dataComment.avoid"
        color="primary"
        label="Permitir al solicitante subsanar el registro"
        true-value="yes"
        false-value="no"
      />
    </div>

    <q-card-actions align="center">
        <q-btn label="Aceptar" color="primary" @click="onSubmit" />
      <q-btn label="Cancelar" color="negative" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
