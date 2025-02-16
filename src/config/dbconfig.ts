import { connect } from 'mongoose';
import { MONGO_URL } from './env';

export const dbConnection = {
	default: async () => {
		const database = await connect(MONGO_URL);
		console.log(`Database connected: ${database.connection.name}`);
	}
};
