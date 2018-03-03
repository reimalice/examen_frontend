import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import Docentes from './components/Docentes';
import Aulas from './components/Aulas';
import Materias from './components/Materias';
import Horarios from './components/Horarios';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/docentes',
      name: 'Docentes',
      component: Docentes
    },
    {
      path: '/aulas',
      name: 'Aulas',
      component: Aulas
    }
    ,
    {
      path: '/materias',
      name: 'Materias',
      component: Materias
    }
    ,
    {
      path: '/horarios',
      name: 'Horarios',
      component: Horarios
    }
  ]
});
