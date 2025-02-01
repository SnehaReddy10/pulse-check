import { Request, Response } from 'express';
import { signinSchema } from '../../validators/signin.validator';
import { User } from '../../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';

export const SignInController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signinSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.Unauthorized)
        .json({ message: ErrorMessages.User.UserNotFound });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      res
        .status(StatusCodes.Unauthorized)
        .json({ message: ErrorMessages.User.InvalidCredentials });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.User.SignInSuccessful,
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
