/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NOVA_POSHTA_BASE_URL: string;
    NOVA_POSHTA_API_KEY: string;

    UKR_POSHTA_BASE_URL: string;
    UKR_POSHTA_API_KEY: string;

    DELIVERY_BASE_URL: string;
    DELIVERY_API_KEY: string;

    AFTERSHIP_BASE_URL: string;
    AFTERSHIP_API_KEY: string;

    MONGO_AUTH_STRING: string;

    JWT_SECRET_KEY: string;
    JWT_EXPIRATION_TIME: string;
  }
}
