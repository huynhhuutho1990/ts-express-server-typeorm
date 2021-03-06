// Mapper for environment variables

// production || development || staging
export const environment = process.env.NODE_ENV || 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 9090;

export const DB_INFO = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_DB: process.env.POSTGRES_DB || 'waves_surprise_gift'
};

export const MASTER_KEY_HEADER = 'auth_key';
export const MASTER_KEY = process.env.MASTER_KEY;

export const SOURCE_EMAIL_ADDRESS = process.env.SOURCE_EMAIL_ADDRESS;

export const DEFAULT_PAGE_SIZE = 100;

export const URL_WEB_APP = process.env.URL_WEB_APP;
export const URL_WEB_HOME = process.env.URL_WEB_HOME;
export const SLACK_INFO = {
  TOKEN: process.env.SLACK_TOKEN,
  CHANNEL_404: process.env.SLACK_CHANNEL_404,
  CHANNEL_500: process.env.SLACK_CHANNEL_500
};
