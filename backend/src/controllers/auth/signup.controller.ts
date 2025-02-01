import { Request, Response } from 'express';
import { signupSchema } from '../../validators/signup.validator';
import { User } from '../../models/user.model';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { AuthProvider } from '../../constants/enums/auth-provider';

export const SignupController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signupSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { name, username, email, password, role } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(StatusCodes.Conflict)
        .json({ message: ErrorMessages.User.EmailAlreadyInUse });
      return;
    }

    const user = new User({
      name,
      username,
      email,
      password,
      role,
      authProvider: AuthProvider.EMAIL,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    res.status(StatusCodes.Created).json({
      message: ErrorMessages.User.UserCreatedSuccessfully,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    return;
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
    return;
  }
};
