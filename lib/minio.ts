import { S3Client } from '@aws-sdk/client-s3';

const minioClient = new S3Client({
    endpoint: (() => {
        const ep = process.env.MINIO_ENDPOINT || 'localhost:9000';
        return ep.startsWith('http') ? ep : `http://${ep}`;
    })(),
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY!,
        secretAccessKey: process.env.MINIO_SECRET_KEY!,
    },
    region: process.env.MINIO_REGION || 'us-east-1',
});

export default minioClient;
