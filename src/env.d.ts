declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_ENV: 'development' | 'production';
    readonly NEXT_PUBLIC_NCP_KEY_ID: string;
  }
}
