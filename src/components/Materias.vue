<template>
  <section>
    <h2 class="title">Materias</h2>
    <div class="btn-container">
      <button @click="agregar" 
      class="btn btn-primary" type="button">Agregar una materia</button>
    </div>
    <form @submit.prevent="guardar" v-if="mostrar">
      <div class="form-group">
        <label for="sigla">Sigla de la materia</label>
        <input id="sigla" type="text" v-model="sigla" class="form-control" required>
      </div>
    <div class="form-group">
        <label for="descripcion">Descripción de la materia</label>
        <input id="descripcion" type="text" v-model="descripcion" class="form-control" required>
      </div>
    
     <div class="form-group">
        <label for="">Docente que dictará la materia</label>
        <select class="form-control" v-model="id_docente">
          <option>Seleccione</option>
          <option v-for="item in docentes" :value="item.id">
            {{ item.nombres+' '+item.paterno+' '+item.materno }}
          </option>
        </select>
      </div>
     
      <button class="btn" @click="mostrar = false" type="button">Cancelar</button>
      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>

    <table v-if="!mostrar">
      <tr>
        <th>Sigla de la materia</th>
        <th>desdripción de la materia</th>
        <th>Nombre del docente que dicta la materia</th>

      </tr>
      <tr v-for="item in materias">

        <td>{{ item.sigla }}</td>
        <td>{{ item.descripcion }}</td>
        <td>{{item.docente.nombres +' '+ item.docente.paterno +' '+item.docente.materno}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.url = "http://localhost:4000/api/v1/";

    this.lista();
    this.getDocentes();
  },
  mounted() {},
  data() {
    return {
      materias: [],
      sigla: "",
      descripcion: "",
      mostrar: false,
      docentes:[],
      id_docente: ''
    };
  },
  methods: {
    agregar() {
      this.mostrar = true;
      this.sigla = "";
      this.descripcion = "";
    },
    lista() {
      axios.get(`${this.url}materias`).then(respuesta => {
        console.log("materias", respuesta.data);
        this.materias = respuesta.data;
      });
    },
    getDocentes () {
      axios.get(`${this.url}docentes`)
      .then(respuesta => {
        this.docentes = respuesta.data;
        console.log('docentes', this.docentes);
      })
    },
    guardar() {
      let data = {
        sigla: this.sigla,
        descripcion: this.descripcion,
        id_docente: this.id_docente
      };
      console.log("enviado!", data);
      if (this.id) {
        axios.put(`${this.url}materias/${this.id}`, data).then(respuesta => {
          this.mostrar = false;
          this.lista();
        });
      } else {
        axios.post(`${this.url}materias`, data).then(respuesta => {
          console.log("Guardado!");
          this.mostrar = false;
          this.lista();
        });
      }
    }
  }
};
</script>


