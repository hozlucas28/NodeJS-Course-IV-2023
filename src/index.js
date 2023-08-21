import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(corsMiddleware())

//Rutas
app.use('/movies', moviesRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
	console.log(`Servidor funcionando en http://localhost:${port}`)
})
