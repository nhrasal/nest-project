import { config } from 'dotenv';
import * as path from 'path';
export function toBool(value: string): boolean {
    return value === "true";
  }
config({
	path: path.join(process.cwd(), `${process.env.NODE_ENV || 'dev'}.env`),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV = {
	port: process.env.PORT,
	env: process.env.NODE_ENV || ENV_DEVELOPMENT,
	isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

	logFilePath: process.env.LOG_FILE_PATH,
	OTP_Timeout: process.env.OTP_Timeout,

	API_PREFIX: process.env.API_PREFIX,
	API_TITLE: process.env.API_TITLE,
	API_DESC: process.env.API_DESC,
	API_VERSION: process.env.API_VERSION,

	SALT_ROUNDS: +process.env.SALT_ROUNDS,
	JWT_SECRET: process.env.JWT_SECRET,
	REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
	IMAGE_LINK: process.env.IMAGE_LINK,
	IMAGE_LOCAL_PATH: process.env.IMAGE_LOCAL_PATH,
	IMAGE_MAX_SIZE: +process.env.IMAGE_MAX_SIZE || 2097152,

	postGreDB: {
		type: 'mysql',
		host: process.env.TYPEORM_HOST,
		port: +process.env.TYPEORM_PORT,
		username: process.env.TYPEORM_USERNAME,
		password: process.env.TYPEORM_PASSWORD,
		database: process.env.TYPEORM_DATABASE,

		synchronize: process.env.TYPEORM_SYNCHRONIZE,
		logging: process.env.TYPEORM_LOGGING,
	},
};

export const ormConfig: any = {
	type: 'mysql',
	host: ENV.postGreDB.host,
	port: +ENV.postGreDB.port,
	username: ENV.postGreDB.username,
	password: ENV.postGreDB.password,
	database: ENV.postGreDB.database,

	synchronize: toBool(ENV.postGreDB.synchronize),
	logging: toBool(ENV.postGreDB.logging),
};