import { z } from 'zod';

export const phoneSchema = z
    .string()
    .regex(/^09[0-9]{9}$/, 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود');

export const loginSchema = z.object({
    phone: phoneSchema,
});

export const verifySchema = z.object({
    phone: phoneSchema,
    code: z.string().length(6, 'کد باید ۶ رقم باشد').regex(/^[0-9]+$/, 'کد فقط عدد است'),
    authStatus: z.boolean().optional(),
});

export const profileAddSchema = z.object({
    firstname: z.string().min(1, 'نام الزامی است').max(50),
    lastname: z.string().max(50).optional(),
    phone: phoneSchema,
});

export const profileEditSchema = z.object({
    firstname: z.string().min(1).max(50).optional(),
    lastname: z.string().max(50).optional(),
    username: z.string().max(32).regex(/^[a-zA-Z0-9_]*$/, 'نام کاربری فقط شامل حروف انگلیسی، عدد و آندرلاین').optional(),
    bio: z.string().max(70).optional(),
    birthday: z.string().optional(),
    channel: z.string().max(100).optional(),
});

export const switchAccountSchema = z.object({
    phone: phoneSchema,
});
