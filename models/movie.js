/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   En este archivo se ejemplifica un modelo del patrón de
 *         diseño MVC (Modelo - Vista - Controlador).
-------------------------------------------------------------------------- */

import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
// import moviesJSON from './data/movies.json' assert { type: 'json' } // Primera forma de importar un JSON utilizando "ECMA modules".

// Segunda forma de importar un JSON utilizando "ECMA modules"
const require = createRequire(import.meta.url)
const moviesJSON = require('../data/movies.json')

export class MovieModel {
	/* ----------------------------------- GET ---------------------------------- */

	static async getAll({ genre }) {
		if (genre) return moviesJSON.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
		return moviesJSON
	}

	static async getById({ id }) {
		const movie = moviesJSON.find((movie) => movie.id === id)
		return movie
	}

	/* ---------------------------------- POST ---------------------------------- */

	static async create({ input }) {
		const newMovie = {
			id: randomUUID(),
			...input,
		}

		moviesJSON.push(newMovie)
		return newMovie
	}

	/* ---------------------------------- PATH ---------------------------------- */

	static async update({ id, input }) {
		const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)
		if (movieIndex === -1) return false

		moviesJSON[movieIndex] = {
			...moviesJSON[movieIndex],
			...input,
		}

		return moviesJSON[movieIndex]
	}

	/* --------------------------------- DELETE --------------------------------- */

	static async delete({ id }) {
		const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)
		if (movieIndex === -1) return false

		moviesJSON.splice(movieIndex, 1)
		return true
	}
}
