var bnavegaEnPaginas, bvalidaPagina, bvalidaTamanoPagina;
var codigosPermitidos = [8, 9, 13, 27]; //[back space, tab, enter, escape]

new Vue({
	el: '#main',
	//Muestro la "lista" de películas desde el inicio con el método "obtieneCatalogo"
	created: function(){
		this.obtieneRegistros()
	},
	data: {
		contenido: [],
		contenido_pagina: [],
		encabezados: {
			id: 'Id',
			nombre: 'Nombre',
			correo_e: 'Correo Electrónico',
			cuerpo: 'Cuerpo',
			accion: 'Acción'
		},
		nuevo_registro: {
			id_campo_name: 'txtName',
			placeholder_name: 'Nombre',
			id_campo_email: 'txtEMail',
			placeholder_email: 'Correo Electrónico',		
			id_campo_body: 'txtBody',
			placeholder_body: 'Cuerpo',
			id_btn_guardar: 'btnGuardar'
		},
		index_registro: 0,
		id_registro: 0,
		cadena_busqueda: '',
		name_registro: '',
		email_registro: '',
		body_registro: '',
		total_registros: 0,
		tamano_pagina: 10,
		tamano_pagina_defecto: 10,
		pagina: 0,
		total_paginas: 0,
		paginas_coincidencia: 0,
		registro_inicial: 0,
		registro_final: 0,
		longitud_maxima: 0,
		muestra_detalle: false
	},
	methods: {
		//Con éste método lleno la "lista", es decir el listado de registros
		obtieneRegistros: function(){
			axios.get(urlPosts).then(response => { 
				this.contenido = response.data; 
				this.estableceValores();
			});
		},
		estableceValores: function(){
			this.total_registros = parseInt(this.total_registros);
			this.tamano_pagina = parseInt(this.tamano_pagina);
			this.pagina = parseInt(this.pagina);
			this.total_paginas = parseInt(this.total_paginas);			
			this.registro_final = parseInt(this.registro_final);
			this.longitud_maxima = parseInt(this.longitud_maxima);
						
			this.total_registros = this.contenido.length;
			this.longitud_maxima = this.total_registros.toString().length;
			this.registro_inicial = 0;
			if(this.tamano_pagina < this.total_registros){
				this.registro_final = this.tamano_pagina - 1;
			}
			else{					
				this.registro_final = this.tamano_pagina;
			}
			this.pagina = 1;

			this.total_paginas = this.total_registros/this.tamano_pagina;
			if(this.total_paginas === parseInt(this.total_paginas, 10)){
				this.total_paginas = this.total_paginas;
			}
			else{
				this.total_paginas = parseInt(this.total_paginas) + 1;
			}		
			this.contenido_pagina = this.contenido.slice(this.registro_inicial, this.registro_final);
			console.log(this.muestra_detalle);
			console.log('Página: ' + this.pagina + '|TanañoPagina: ' + this.tamano_pagina + '|*obtienePosts*|RegInicial: ' + this.registro_inicial + '|RegFinal: ' + this.registro_final + '|ContenidoTotal: ' + this.total_registros);
		},
		paginaInicial: function(){ //OK
			if(this.pagina > 1){
				this.pagina = 1;
				this.registro_inicial = 0;
				this.registro_final = this.tamano_pagina - 1;
				this.contenido_pagina = this.contenido.slice(this.registro_inicial, this.registro_final);
				console.log('Página: ' + this.pagina + '|TanañoPagina: ' + this.tamano_pagina + '|*paginaInicial*|RegInicial: ' + this.registro_inicial + '|RegFinal: ' + this.registro_final + '|ContenidoTotal: ' + this.total_registros);
			}
		},
		siguientePagina: function(){ //OK
			if(this.pagina < this.total_paginas && this.validaPagina()){
				this.pagina = this.pagina + 1;
				this.registro_inicial = this.registro_final + 1;			
				this.registro_final = this.registro_final + this.tamano_pagina;
				if(this.registro_final > this.total_registros){
					this.registro_final = this.total_registros;
					this.pagina = this.total_paginas;
				}
				this.contenido_pagina = this.contenido.slice(this.registro_inicial, this.registro_final);							
				console.log('Página: ' + this.pagina + '|TanañoPagina: ' + this.tamano_pagina + '|*siguientePagina*|RegInicial: ' + this.registro_inicial + '|RegFinal: ' + this.registro_final + '|ContenidoTotal: ' + this.total_registros);
			}
		},
		paginaAnterior: function(){ //OK
			if(this.pagina > 1){
				this.pagina = this.pagina - 1;
				this.registro_inicial = (this.registro_inicial - this.tamano_pagina);
				this.registro_final = (this.registro_inicial + this.tamano_pagina) - 1;
				this.contenido_pagina = this.contenido.slice(this.registro_inicial, this.registro_final);			
				console.log('Página: ' + this.pagina + '|TanañoPagina: ' + this.tamano_pagina + '|*paginaAnterior*|RegInicial: ' + this.registro_inicial + '|RegFinal: ' + this.registro_final + '|ContenidoTotal: ' + this.total_registros);
			}
		},
		paginaFinal: function(){ //OK
			if(this.pagina < this.total_paginas && this.validaPagina()){
				this.pagina = this.paginas_coincidencia;
				this.registro_inicial = (this.tamano_pagina * this.paginas_coincidencia) - this.tamano_pagina;
				this.registro_final = this.buscaRegistro.length;
				this.contenido_pagina = this.contenido.slice(this.registro_inicial, this.registro_final);
				console.log('Página: ' + this.pagina + '|TanañoPagina: ' + this.tamano_pagina + '|*paginaFinal*|RegInicial: ' + this.registro_inicial + '|RegFinal: ' + this.registro_final + '|ContenidoTotal: ' + this.total_registros);
			}
		},
		navegaEnPaginas: function(index){
			bnavegaEnPaginas = false;
			if(index >= this.registro_inicial && index <= this.registro_final){
				bnavegaEnPaginas = true;
			}
			return bnavegaEnPaginas;
		},
		valorPaginasCoincidencia: function(){
			this.paginas_coincidencia = (this.buscaRegistro.length/this.tamano_pagina);
			if(this.paginas_coincidencia === parseInt(this.paginas_coincidencia)){
				this.paginas_coincidencia = this.paginas_coincidencia;
			}
			else{
				this.paginas_coincidencia = parseInt(this.paginas_coincidencia) + 1;
			}
		},
		validaPagina: function(){
			bvalidaPagina = false;
			this.valorPaginasCoincidencia();
			if(this.buscaRegistro.length > this.tamano_pagina && this.pagina < this.paginas_coincidencia){
				bvalidaPagina =  true;
			}
			return bvalidaPagina;
		},
		toggleDetalle: function(){
			this.muestra_detalle = !this.muestra_detalle;
			//this.detalle.id = 0; //Reinicio el valor del "id" del "detalle"
		},
		//Validaciones de formulario
		soloNumeros: function(event){
			// Permitir: back space, tab, enter, escape
			if (codigosPermitidos.indexOf(event.keyCode) !== -1 ||
                // Permitir: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Permitir: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Deja que suceda, no hagas nada
                return;
            }

            // Asegúrese de que es un número y detenga la pulsación de teclas
            if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
		},
		validaTamanoPagina: function(){
			console.log(this.tamano_pagina);
			if(this.tamano_pagina == 0 || this.tamano_pagina == "NaN"){
				alert("Parámetro Inválido");
				this.tamano_pagina = this.tamano_pagina_defecto;
				this.estableceValores();
			}
			else{
				this.estableceValores();
			}
		},
		guardaRegistro: function(){
			//Llamada a servicio para guardar nuevo registro
			console.log('Guarda');
		},
		actualizaRegistro: function(id){
			//Llamada a servicio para actualizar
			console.log('Actualiza: ' + id);
			this.index_registro = id-1;
			this.id_registro = id;
			console.log('index: ' + this.id_registro);
			this.toggleDetalle();
		}
	},
	computed: {
		//Con éste método computado hago la búsqueda y filtrado por medio del input hacia la "lista" que ya está llena con la información de la API
		buscaRegistro: function(){			
			return this.contenido.filter(
				cadena => cadena.postId.toString().includes(this.cadena_busqueda)
				|| cadena.id.toString().includes(this.cadena_busqueda)
				|| cadena.email.toLowerCase().includes(this.cadena_busqueda)
				|| cadena.name.toLowerCase().includes(this.cadena_busqueda)
				|| cadena.body.toLowerCase().includes(this.cadena_busqueda)
			);
		},
		//Con éste método computado obtengo el número de páginas con coincidencia de acuerdo a la busqueda (buscaRegistro)
		paginasCoincidencia: function(){
			this.valorPaginasCoincidencia();
			return this.paginas_coincidencia;
		}
	}
});