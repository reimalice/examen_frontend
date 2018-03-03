<template>
  <section>
    <h2 class="title">Aulas</h2>
    <div class="btn-container">
      <button @click="agregar" 
      class="btn btn-primary" type="button">Agregar una aula</button>
    </div>
    <form @submit.prevent="guardar" v-if="mostrar">
      <div class="form-group">
        <label for="nombre">Nombre del Aula</label>
        <input id="nombre" type="text" v-model="nombre" class="form-control" required>
      </div>
     
      <button class="btn" @click="mostrar = false" type="button">Cancelar</button>
      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>

    <table v-if="!mostrar">
      <tr>
        <th>Nombre del Aula</th>
      </tr>
      <tr v-for="item in aulas">

        <td>{{ item.nombre }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  created () {
    this.url = 'http://localhost:4000/api/v1/';

    this.lista();

  },
  mounted () {

  },
  data () {
    return {
      aulas: [],
      nombre: '',
      mostrar: false
    }
  },
  methods: {
    agregar () {
      this.mostrar = true;
      this.nombre = '';
    },
    lista () {
      axios.get(`${this.url}aulas`)
      .then(respuesta => {
        console.log('aulas', respuesta.data);
        this.aulas = respuesta.data;
      })
    },

    guardar () {
      let data = {
        nombre: this.nombre
      }
      console.log('enviado!', data);
      if (this.id) {
        axios.put(`${this.url}aulas/${this.id}`, data)
        .then(respuesta => {
          this.mostrar = false;
          this.lista();
        })
      } else {
        axios.post(`${this.url}aulas`, data)
        .then(respuesta => {
          console.log('Guardado!')
          this.mostrar = false;
          this.lista();
        })
      }
    }
  }
}
</script>


