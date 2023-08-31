<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

import { userStore } from 'src/modules/Users/store/UserStore';
import { createComment } from '../../services/useCertificationRequestService';


interface Props {
  idSolicitud:string;
  title:string;
  option:false;
}

interface Emits {
  (e: 'update'): void;
}
const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), { title: 'Comentario', option:false });
const dataComment = ref<any>({comment:''})

//const companyStore = useCompaniesStore();

const $q = useQuasar();
const { userCRM } = userStore();

onMounted(async () => {
  console.log('card')
});

const onSubmit = async () => {
  try{
    $q.loading.show({
        message: 'Actualizando...'
    })
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
  <q-card class="q-pa-sm" style="min-width: 500px;">
    <q-card-section class="text-h6">{{props.title}}</q-card-section>
    <q-separator class="q-mb-md" />
    <span class="q-mx-md">Adicione su comentario</span>
    <div class="row q-col-gutter-md q-px-md q-py-md">
      <q-input
        class="col-12"
        v-model="dataComment.comment"
        outlined
        type="textarea"
        dense
        label="Comentario"
      />
      <q-checkbox
        v-if="props.option"
        v-model="dataComment.avoid"
        color="secondary"
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
