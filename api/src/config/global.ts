import dotenv from "dotenv";


dotenv.config();

type NodeEnv = 'dev' | 'prod' | 'qa';

type Env = {
    nodeEnv: NodeEnv;
    isProduction: boolean;
    isDevelopment: boolean;
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    frontendUrl: string;
    databaseUrl: string;

};

function read(key: string, fallback?: string): string {
    const value = process.env[key] ?? fallback;
    if (value === undefined || value === '') {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

function readNumber(key: string, fallback: number): number {
    const raw = process.env[key];
    if (raw === undefined || raw === '') {
        return fallback;
    }

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
        throw new Error(`Environment variable ${key} must be a number`);
    }

    return parsed;
}

function readList(key: string, fallback: string[]): string[] {
    const raw = process.env[key];
    if (!raw) {
        return fallback;
    }

    return raw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

const nodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development';
const isProduction = nodeEnv === 'prod';

export const env: Env = {
    nodeEnv,
    isProduction,
    isDevelopment: nodeEnv === 'dev',
    port: readNumber('PORT', 8000),
    host: read('HOST', '0.0.0.0'),
    apiPrefix: read('API_PREFIX', 'api'),
    corsOrigins: readList('CORS_ORIGINS', ['http://localhost:3000']),
    frontendUrl: read('FRONTEND_URL', 'http://localhost:3000'),
    databaseUrl: read('DATABASE_URL', 'postgresql://root:root@localhost:5435/co_linear'),

};
