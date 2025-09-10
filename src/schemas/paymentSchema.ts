import z from "zod";

export const paymentSchema = z.object({
    phone: z
        .string()
        .regex(/^(01)[0-2,5]{1}[0-9]{8}$/, 'Must be a valid Egyptian phone number'),
    city: z
        .string()
        .min(3, 'City must be at least 3 characters')
        .max(50, 'City must not exceed 50 characters'),
    address: z
        .string()
        .min(10, 'Address must be at least 10 characters')
        .max(200, 'Address must not exceed 200 characters')
});
