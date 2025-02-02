import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetAllOrganizationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(StatusCodes.Unauthorized).json({
        message: ErrorMessages.Auth.Unauthorized,
      });
      return;
    }

    const organizations = await Organization.find({ admin: userId });

    if (!organizations.length) {
      res.status(StatusCodes.NotFound).json({
        message: ErrorMessages.Organization.NotFound,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: organizations,
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
