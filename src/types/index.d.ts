declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly NEXT_PUBLIC_NCP_API_KEY_ID: string;
    readonly NCP_API_KEY: string;
    readonly GCP_API_KEY: string;
  }
}
