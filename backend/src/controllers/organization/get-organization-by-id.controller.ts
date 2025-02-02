import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';

export const GetOrganizationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id);

    if (!organization) {
      res
        .status(StatusCodes.NotFound)
        .json({ message: ErrorMessages.Organization.NotFound });
      return;
    }

    res.status(StatusCodes.OK).json({ success: true, organization });
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
  }
};
