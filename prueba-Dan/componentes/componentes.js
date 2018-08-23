Vue.component('detalles', {
	props: ['generos', 'varios', 'pelicula', 'roles'],
	template: `
	<div>
		<h1>{{ pelicula.title }}</h1>
		<h2>{{ pelicula.title_original }}</h2>
		<img v-bind:src="pelicula.image_small">
		<p>{{ pelicula.description_large }}</p>
		<div>
			<span>{{ varios.duracion }}: {{ pelicula.duration }}</span>
		</div>
		<div>
			<span>{{ varios.anio }}: {{ pelicula.year }}</span>
		</div>
		<div>
			<span>{{ varios.clasificacion }}: {{ pelicula.rating_code }}</span>
		</div>
		<span>{{ varios.genero }}: </span>
		<span>
			<span v-for="(genero, index) in generos">
				{{ genero.desc }}<span v-show="index <= generos.length - 2">,</span> 
			</span>
		</span>
		<div>
			<div v-for="rol in roles">
				<div v-if="rol.desc === 'Actor'">
					<span>{{ varios.reparto }}: </span>
					<lista-talentos v-bind:talentos="rol.talents.talent"></lista-talentos>
				</div>
				<div v-else-if="rol.desc === 'Director'">
					<span>{{ varios.direccion }}: </span>
					<lista-talentos v-bind:talentos="rol.talents.talent"></lista-talentos>
				</div>
				<div v-else-if="rol.desc === 'Escritor'">
					<span>{{ varios.libreto }}: </span>
					<lista-talentos v-bind:talentos="rol.talents.talent"></lista-talentos>
				</div>
				<div v-else-if="rol.desc === 'Productor'">
					<span>{{ varios.produccion }}: </span>
					<lista-talentos v-bind:talentos="rol.talents.talent"></lista-talentos>
				</div>
			</div>
		</div>
	</div>
	`
});

Vue.component('lista-talentos', {
	props: ['talentos'],
	template: `
	<span>
		<span v-for="(talento, index) in talentos">
			{{ talento.name }} {{ talento.surname }}<span v-show="index <= talentos.length - 2">,</span>
		</span>
	</span>
	`
});