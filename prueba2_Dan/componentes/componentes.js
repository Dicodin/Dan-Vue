Vue.component('registros', {
	props: ['elementos'],
	name: 'elementos',
	template: `
	<div>
		<td v-for="(value, key) in elementos" v-if="key != 'postId' && navegaEnPaginas(index)">
			{{ value }}
		</td>
	</div>
	`
});