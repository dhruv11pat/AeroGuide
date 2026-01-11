import { z } from 'zod';

// Auth schemas
export const googleAuthSchema = z.object({
  credential: z.string().min(1, 'Google credential is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

// School schemas
export const createSchoolSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  location: z.string().min(2, 'Location is required'),
  full_address: z.string().optional(),
  image_url: z.string().url('Must be a valid URL'),
  pricing: z.string().min(1, 'Pricing is required'),
  duration: z.string().min(1, 'Duration is required'),
  certifications: z.array(z.string()).default([]),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  established: z.number().int().min(1900).max(2030).optional(),
  fleet_size: z.number().int().min(0).optional(),
  instructors: z.number().int().min(0).optional(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  programs: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.string().min(1),
    price: z.string().min(1),
  })).default([]),
});

export const updateSchoolSchema = createSchoolSchema.partial();

// Review schemas
export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().min(50, 'Review must be at least 50 characters'),
  course: z.string().min(1, 'Course is required'),
});

export const updateReviewStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

// Inquiry schemas
export const createInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiry_type: z.enum(['general', 'discovery_flight', 'enrollment', 'brochure']).default('general'),
});

// Contact schemas
export const createContactSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Query schemas
export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const schoolSearchSchema = paginationSchema.extend({
  search: z.string().optional(),
  location: z.string().optional(),
  certification: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
});

// Type exports
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type SchoolSearchParams = z.infer<typeof schoolSearchSchema>;
