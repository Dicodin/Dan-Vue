new Vue({
	el: '#main',
	//Muestro la "lista" de películas desde el inicio con el método "obtieneCatalogo"
	created: function(){
		this.obtieneCatalogo()
	},
	data: {
		lista: [],
		detalle: [],
		detalle_genre: [],
		detalle_role: [],
		detalle_varios: {
			duracion: 'Duración',
			anio: 'Año de Publicación',
			clasificacion: 'Clasificación',
			genero: 'Género',
			reparto: 'Reparto',
			direccion: 'Dirección',
			libreto: 'Libreto',
			produccion: 'Produccción'
		},
		nombre: '',
		muestra_detalle: false,
	},
	methods: {
		//Con éste método lleno la "lista", es decir el catálogo de películas
		obtieneCatalogo: function(){
			axios.get(urlCatalogoCV).then(response => { this.lista = response.data.response.groups });
		},
		//Con éste método obtengo y lleno el "detalle" de la película
		obtieneDetalle: function(id){
			axios.get(urlDetalle+id).then(response => { 
				this.detalle = response.data.response.group.common, 
				this.detalle_extendedcommon = this.detalle.extendedcommon, //Sólo se usa como abreviación o atajo
				this.detalle_genre = this.detalle_extendedcommon.genres.genre, 
				this.detalle_role = this.detalle_extendedcommon.roles.role 
			});
			this.detalle.id = this.lista.id; //Igualo los "id" de la "lista" y el "detalle"
		},
		toggleDetalle: function(){
			this.muestra_detalle = !this.muestra_detalle;
			this.detalle.id = 0; //Reinicio el valor del "id" del "detalle"
		}
	},
	computed: {
		//Con éste método computado hago la búsqueda y filtrado por medio del input hacia la "lista" que ya está llena con la información de la API
		buscaPelicula: function(){
			return this.lista.filter(pelicula => pelicula.title.toLowerCase().includes(this.nombre));
		}
	}
});