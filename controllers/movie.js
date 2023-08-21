/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   En este archivo se ejemplifica un controlador del patrón de
 *         diseño MVC (Modelo - Vista - Controlador).
-------------------------------------------------------------------------- */

import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
	/* ----------------------------------- GET ---------------------------------- */

	static async getAll(req, res) {
		const { genre } = req.query
		const movies = await MovieModel.getAll({ genre })
		res.json(movies)
	}

	static async getById(req, res) {
		const { id } = req.params
		const movie = await MovieModel.getById({ id })

		if (movie) return res.json(movie)
		res.status(404).json({ message: 'Movie Not Found' })
	}

	/* ---------------------------------- POST ---------------------------------- */

	static async create(req, res) {
		const result = validateMovie(req.body)
		if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

		const newMovie = await MovieModel.create({ input: result.data })
		res.status(201).json(newMovie)
	}

	/* ---------------------------------- PATH ---------------------------------- */

	static async update(req, res) {
		const result = validatePartialMovie(req.body)
		if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

		const { id } = req.params
		const updatedMovie = await MovieModel.update({ id, input: result.data })

		res.json(updatedMovie)
	}

	/* --------------------------------- DELETE --------------------------------- */

	static async delete(req, res) {
		const { id } = req.params

		const result = await MovieModel.delete({ id })

		if (result === false) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		return res.json({ message: 'Movie deleted' })
	}
}
