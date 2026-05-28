import minioClient from "@/lib/minio";
import { PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST() {
    const bucketName = process.env.MINIO_BUCKET_NAME!;

    const policy = {
        Version: "2012-10-17",
        Statement: [
            {
                Sid: "PublicRead",
                Effect: "Allow",
                Principal: "*",
                Action: ["s3:GetObject"],
                Resource: [`arn:aws:s3:::${bucketName}/*`],
            },
        ],
    };

    await minioClient.send(
        new PutBucketPolicyCommand({
            Bucket: bucketName,
            Policy: JSON.stringify(policy),
        })
    );

    return NextResponse.json({ success: true, message: "Bucket policy set to public read." });
}
