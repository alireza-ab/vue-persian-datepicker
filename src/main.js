import Vue from 'vue'
import App from './App.vue'

// import PersianDate from '@alireza-ab/persian-date';

// console.log((new PersianDate).parse('1400'));

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
