declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly NEXT_PUBLIC_NCP_API_KEY_ID: string;
    readonly NEXT_PUBLIC_NCP_API_KEY: string;
  }
}
