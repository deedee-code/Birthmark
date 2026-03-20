import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  relationship: z.string().min(1, 'Relationship is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  customMessage: z.string().optional(),
})

export const messageTemplateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Template name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  isDefault: z.boolean().optional().default(false),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type MessageTemplateInput = z.infer<typeof messageTemplateSchema>
