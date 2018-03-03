<template>
  <section>
    <h2 class="title">Docentes</h2>
    <div class="btn-container">
      <button @click="agregar" 
      class="btn btn-primary" type="button">Agregar un docente</button>
    </div>
    <form @submit.prevent="guardar" v-if="mostrar">
      <div class="form-group">
        <label for="nombres">Nombres</label>
        <input id="nombres" type="text" v-model="nombres" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="paterno">Apellido Paterno</label>
        <input id="paterno" type="text" v-model="paterno" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="">Apellido Materno</label>
        <input id="materno" type="text" v-model="materno" class="form-control" required>

      </div>
      <button class="btn" @click="mostrar = false" type="button">Cancelar</button>
      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>

    <table v-if="!mostrar">
      <tr>
        <th>Nombres</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
      </tr>
      <tr v-for="item in docentes">

        <td>{{ item.nombres }}</td>
        <td>{{ item.paterno }}</td>
        <td>{{ item.materno }}</td>
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
      docentes: [],
      nombres: '',
      paterno: '',
      materno: '',
      empresas: [],
      mostrar: false
    }
  },
  methods: {
    agregar () {
      this.mostrar = true;
      this.nombre = '';
      this.paterno = '';
      this.materno = '';
    },
    lista () {
      axios.get(`${this.url}docentes`)
      .then(respuesta => {
        console.log('docentes', respuesta.data);
        this.docentes = respuesta.data;
      })
    },

    guardar () {
      let data = {
        nombres: this.nombres,
        paterno: this.paterno,
        materno: this.materno
      }
      console.log('enviado!', data);
      if (this.id) {
        axios.put(`${this.url}docentes/${this.id}`, data)
        .then(respuesta => {
          this.mostrar = false;
          this.lista();
        })
      } else {
        axios.post(`${this.url}docentes`, data)
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


