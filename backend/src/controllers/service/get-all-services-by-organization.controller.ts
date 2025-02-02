import { Request, Response } from 'express';
import { Service } from '../../models/service.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export const GetAllServicesForOrganization = async (
  req: Request,
  res: Response
) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(StatusCodes.BadRequest).json({
        success: false,
        message: ErrorMessages.Service.OrganizationIdRequired,
      });
      return;
    }

    const services = await Service.find({
      organization: organizationId,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: services,
    });
    return;
  } catch (error: any) {
    res.status(StatusCodes.InternalServerError).json({
      success: false,
      message: ErrorMessages.Server.InternalServerError,
      error: error.message,
    });
    return;
  }
};
