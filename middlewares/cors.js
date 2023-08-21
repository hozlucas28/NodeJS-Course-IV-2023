import cors from 'cors'

const ACCEPTED_ORIGINS = ['https://movies.com', `http://localhost:${process.env.PORT ?? 3000}`]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: (origin, callback) => {
			if (acceptedOrigins.includes(origin)) {
				return callback(null, true)
			}

			if (!origin) {
				return callback(null, true)
			}

			return callback(new Error('Not allowed by CORS'))
		},
	})
