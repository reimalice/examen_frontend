<template>
  <section>
    <h2 class="title">Horarios</h2>
    <div class="btn-container">
      <button @click="agregar" 
      class="btn btn-primary" type="button">Asignar un horario a una materia</button>
    </div>
    <form @submit.prevent="guardar" v-if="mostrar">
      <div class="form-group">
        <label for="sigla">Materia</label>
        <select class="form-control" v-model="id_materia">
            <option>Seleccione</option>
            <option v-for="item in materias" :value="item.id">
                {{ item.sigla }}
            </option>
        </select>
      </div>
      <div class="form-group">
        <label for="sigla">Aula</label>
        <select class="form-control" v-model="id_aula">
            <option>Seleccione</option>
            <option v-for="item in aulas" :value="item.id">
                {{ item.nombre }}
            </option>
        </select>
      </div>

    <div class="form-group">
        <label for="sigla">Dia de la semana que se diactará la materia</label>
        <select class="form-control" v-model="dia">
            <option>Seleccione</option>
            <option>LUNES</option>
            <option>MARTES</option>
            <option>MIÉRCOLES</option>
            <option>JUEVES</option>
            <option>VIERNES</option>
            <option>SÁBADO</option>            
        </select>
      </div>
    
     <div class="form-group">
        <label for="">Hora de inicio</label>
        <input class="form-control" type="time" v-model="hora_inicio">
      </div>

    <div class="form-group">
        <label for="">Hora de finalización</label>
        <input class="form-control" type="time" v-model="hora_fin">
      </div>
     
      <button class="btn" @click="mostrar = false" type="button">Cancelar</button>
      <button class="btn btn-primary" type="submit">Guardar</button>
    </form>

    <table v-if="!mostrar">
      <tr>
        <th>Materia</th>
        <th>Docente</th>
        <th>Aula</th>
        <th>Día</th>
        <th>Horario</th>

      </tr>
      <tr v-for="item in horarios" class="text-center">

        <td>{{ item.materia.sigla+' '+item.materia.descripcion}}</td>
        <td>{{ item.materia.docente.nombres+' '+item.materia.docente.paterno+' '+item.materia.docente.materno }}</td>
        <td>{{item.id_aula}}</td>
        <td>{{item.dia}}</td>
        <td>{{item.hora_inicio+' - '+item.hora_fin}}</td>
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
    this.getMaterias();
    this.getAulas();
  },
  mounted() {},
  data() {
    return {
      horarios: [],
      mostrar: false,
      materias: [],
      id_materia: "",
      id_aula:"",
      dia:"",
      hora_inicio:"",
      hora_fin:"",
      aulas: [],
      dia:""
    };
  },
  methods: {
    agregar() {
      this.mostrar = true;
      this.sigla = "";
      this.descripcion = "";
    },
    lista() {
      axios.get(`${this.url}horarios`).then(respuesta => {
        console.log("horarios", respuesta.data);
        this.horarios = respuesta.data;
      });
    },
    getMaterias() {
      axios.get(`${this.url}materias`).then(respuesta => {
        this.materias = respuesta.data;
        console.log("materias", this.materias);
      });
    },
    getAulas() {
      axios.get(`${this.url}aulas`).then(respuesta => {
        this.aulas = respuesta.data;
        console.log("aulas", this.aulas);
      });
    },
    guardar() {
      let data = {
        dia: this.dia,
        hora_inicio: this.hora_inicio,
        hora_fin: this.hora_fin,
        id_aula: this.id_aula,
        id_materia: this.id_materia,
      };
      console.log("enviado!", data);

        axios.post(`${this.url}horarios`, data).then(respuesta => {
          console.log("Guardado!");
          this.mostrar = false;
          this.lista();
        }).catch(respuesta=>{
            alert("Guardado!");
        });
      
    }
  }
};
</script>


