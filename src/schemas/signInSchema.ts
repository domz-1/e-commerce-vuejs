import { toFormValidator } from '@vee-validate/zod';
import zod from 'zod';
export const signInSchema = toFormValidator(
    zod
        .object({

            email: zod.string().email('Please enter a valid email address'),
      
            password: zod
                .string()
                .min(6, 'Password must be at least 6 characters')
                .regex(
                    /[A-Z]/,
                    'Password must contain at least one uppercase letter'
                )
                .regex(/[0-9]/, 'Password must contain at least one number')
        })

);
