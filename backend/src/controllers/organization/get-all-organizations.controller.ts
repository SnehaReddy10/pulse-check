import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import mongoose from 'mongoose';

export const GetAllOrganizationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id
      ? new mongoose.Types.ObjectId(req.user.id)
      : null;
    if (!userId) {
      res.status(StatusCodes.Unauthorized).json({
        message: ErrorMessages.Auth.Unauthorized,
      });
      return;
    }

    const organizations = await Organization.aggregate([
      {
        $match: { admin: userId },
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: 'organization',
          as: 'services',
        },
      },
      {
        $addFields: {
          servicesCount: { $size: '$services' },
        },
      },
      {
        $project: {
          services: 0,
        },
      },
    ]);

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
