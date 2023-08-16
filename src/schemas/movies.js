/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   En este archivo se muestra un caso de uso de Zod (módulo de
 *         terceros) para verificar los datos entrantes al realizar
 *         una solicitud <POST> a la API.
-------------------------------------------------------------------------- */

const z = require('zod')

const movieSchema = z.object({
	title: z.string({
		invalid_type_error: 'Movie title must be a string',
		required_error: 'Movie title is required',
	}),
	year: z.number().int().min(1900).max(2024),
	director: z.string(),
	duration: z.number().int().positive(),
	rate: z.number().min(0).max(10).default(5.5),
	poster: z.string().url(),
	genre: z.array(z.enum(['Action', 'Crime', 'Drama'])),
})

function validateMovie(movie) {
	return movieSchema.safeParse(movie)
}

function validatePartialMovie(movie) {
	return movieSchema.partial().safeParse(movie)
}

module.exports = { validateMovie, validatePartialMovie }
