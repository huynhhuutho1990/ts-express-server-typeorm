import { cleanEnv, port, str, host, url } from 'envalid';

/**
 * Checks whether required environment variables are present for application
 */
const validateEnv = (): any => {
  cleanEnv(process.env, {
    HOST: host(),
    PORT: port(),
    POSTGRES_DB: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    AIRTABLE_API_KEY: str(),
    AIRTABLE_BASE_ID: str(),
    GOOGLE_APPLICATION_CREDENTIALS: str(),
    SOURCE_EMAIL_ADDRESS: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    MASTER_KEY: str(),
    URL_WEB_APP: url(),
    URL_WEB_HOME: url(),
    SLACK_TOKEN: str(),
    SLACK_CHANNEL_404: str(),
    SLACK_CHANNEL_500: str()
  });
};

export { validateEnv };
