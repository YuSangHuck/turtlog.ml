import Vue from 'vue';
import VueMeta from 'vue-meta';

const option = {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true,
};
Vue.use(VueMeta, option);
