import { z } from 'zod';
import { ErrorMessages } from '../constants/error-messages';
import { Role } from '../constants/enums/role';

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, ErrorMessages.User.NameIsRequired)
    .max(100, ErrorMessages.User.NameIsLong),
  username: z.string(),
  email: z.string().email(ErrorMessages.User.InvalidEmail),
  password: z
    .string()
    .min(6, ErrorMessages.User.PasswordIsShort)
    .max(100, ErrorMessages.User.PasswordIsLong),
  role: z.enum([Role.ADMIN, Role.USER, Role.MERCHANT]).optional(),
});
