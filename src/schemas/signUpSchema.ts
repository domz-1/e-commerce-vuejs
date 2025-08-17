import { toFormValidator } from '@vee-validate/zod';
import zod from 'zod';
export const signUpSchema = toFormValidator(
    zod
        .object({
            name: zod
                .string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must be less than 50 characters'),
            email: zod.string().email('Please enter a valid email address'),
            phone: zod
                .string()
                .regex(
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    'Please enter a valid phone number'
                ),
            password: zod
                .string()
                .min(6, 'Password must be at least 6 characters')
                .regex(
                    /[A-Z]/,
                    'Password must contain at least one uppercase letter'
                )
                .regex(/[0-9]/, 'Password must contain at least one number'),
            rePassword: zod.string(),
        })
        .refine((data) => data.password === data.rePassword, {
            message: "Passwords don't match",
            path: ['rePassword'],
        })
);
