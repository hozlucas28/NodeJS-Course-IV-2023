/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   En este archivo se encuentran desarrolladas las funciones de
 *         validación del objeto: "Movie", utilizando la librería "zod".
-------------------------------------------------------------------------- */

import * as zod from 'zod'

const movieSchema = zod.object({
	director: zod.string(),
	duration: zod.number().int().positive(),
	genre: zod.array(zod.enum(['Action', 'Crime', 'Drama'])),
	poster: zod.string().url(),
	rate: zod.number().min(0).max(10).default(5.5),
	title: zod.string(),
	year: zod.number().int().min(1900).max(2024),
})

export function validateMovie(movie) {
	return movieSchema.safeParse(movie)
}

export function validatePartialMovie(movie) {
	return movieSchema.partial().safeParse(movie)
}
