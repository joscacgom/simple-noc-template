import 'dotenv/config'
import * as env from 'env-var'

export const envPlugin = {
    PORT: env.get('PORT').default('3000').asPortNumber(),
    MAIL_SERVICE: env.get('MAIL_SERVICE').required().asString(),
    MAIL_SERVICE_HOST: env.get('MAIL_SERVICE_HOST').required().asString(),
    MAIL_SERVICE_PORT: env.get('MAIL_SERVICE_PORT').required().asPortNumber(),
    MAIL_SERVICE_EMAIL: env.get('MAIL_SERVICE_EMAIL').required().asEmailString(),
    MAIL_SERVICE_SECRET_KEY: env.get('MAIL_SERVICE_SECRET_KEY').required().asString(),
    MODE_ENV: env.get('MODE_ENV').required().asString(),
    MONGO_URI: env.get('MONGO_URI').required().asString(),
    DATABASE_URL: env.get('DATABASE_URL').default('url').asString(),
    DIRECT_URL: env.get('DIRECT_URL').default('url').asString(),
}

