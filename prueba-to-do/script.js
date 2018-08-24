new Vue({
	el: '#appVue',
	data: {
		lista: [],
		nuevaTarea: ''
	},
	methods: {
		agregaTarea: function(){
			this.lista.push({tarea: this.nuevaTarea, completada: false});
			this.nuevaTarea = '';
		}
	}
});