/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Los CORS (Cross-Origin Resource Sharing) otorgan acceso a la
 *         API. Si la consulta viene de la misma API, no es necesaria una
 *         autorización.
 *
 *
 * IMPORTANTE:
 *  			  - Los CORS varían según el método, requiriendo información
 *                  extra (CORS PRE-FLIGHT), usualmente al realizar solicitudes
 *                  con los métodos PUT/PATCH/DELETE.
-------------------------------------------------------------------------- */

const crypto = require('node:crypto')
const express = require('express')
const moviesJSON = require('./data/movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js')

const app = express()
const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://movies.com']

app.disable('x-powered-by')

app.use(express.json())

app.get('/movies', (req, res) => {
	const origin = req.header('origin')

	// Habilito el acceso a la API a través de CORS
	if (ACCEPTED_ORIGINS.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin)
	}

	const { genre } = req.query

	if (genre) {
		const filteredMovies = moviesJSON.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
		return res.json(filteredMovies)
	}

	res.json(moviesJSON)
})

app.get('/movies/:id', (req, res) => {
	const { id } = req.params
	const movie = moviesJSON.find((movie) => movie.id === id)

	if (movie) return res.json(movie)
	res.status(404).json({ message: 'Movie Not Found' })
})

app.post('/movies', (req, res) => {
	const result = validateMovie(req.body)
	if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

	const newMovie = {
		id: crypto.randomUUID(),
		...result.data,
	}

	moviesJSON.push(newMovie)
	res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
	const result = validatePartialMovie(req.body)
	if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

	const { id } = req.params
	const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)

	if (movieIndex < 0) return res.status(404).json({ message: 'Movie Not Found' })

	const updatedMovie = {
		...moviesJSON[movieIndex],
		...result.data,
	}

	moviesJSON[movieIndex] = updatedMovie
	res.json(updatedMovie)
})

app.options('/movies/:id', (req, res) => {
	const origin = req.header('origin')

	// Habilito el acceso a la API a través de CORS y CORS PRE-FLIGHT
	if (ACCEPTED_ORIGINS.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin)
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
	}

	res.send()
})

const port = process.env.PORT ?? 3000

app.listen(port, () => {
	console.log(`Servidor funcionando en http://localhost:${port}`)
})
