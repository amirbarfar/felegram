import minioClient from "@/lib/minio";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as any

    if (!file) {
        return NextResponse.json({
            error: 'فایل ضروری است',
            status: 400
        })
    }
    const random = Math.floor(Math.random() * 1000000)
    const uniqeName = `${Date.now()}-${file.name}-${random}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);

    await minioClient.send(new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET_NAME,
        Key: uniqeName,
        ContentType: file.type,
        Body: buffer
    }))

    const endpoint = process.env.MINIO_ENDPOINT?.startsWith('http')
        ? process.env.MINIO_ENDPOINT
        : `http://${process.env.MINIO_ENDPOINT}`;
    const publicLink = `${endpoint}/${process.env.MINIO_BUCKET_NAME}/${uniqeName}`;

    return NextResponse.json({
        success : true,
        status : 201,
        data : publicLink
    })
}