import { Request, Response } from 'express';
import { serviceSchema } from '../../validators/service.validator';
import { Service } from '../../models/service.model';
import { Organization } from '../../models/organization.model';
import { StatusCodes } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';
import { Role } from '../../constants/enums/role';

export const CreateServiceController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || user.role !== Role.ADMIN) {
      res.status(StatusCodes.Forbidden).json({
        success: false,
        message: ErrorMessages.Auth.Forbidden,
      });
      return;
    }

    const { success, data, error } = serviceSchema.safeParse(req.body);
    if (!success) {
      const errors = error.errors.map((x) => x.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { name, description, status, organizationId } = data;

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      res.status(StatusCodes.NotFound).json({
        success: false,
        message: ErrorMessages.Organization.NotFound,
      });
      return;
    }

    const service = new Service({
      name,
      description,
      status,
      organization: organizationId,
      createdBy: user._id,
    });

    await service.save();

    res.status(StatusCodes.Created).json({
      success: true,
      message: 'Service created successfully',
      service,
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
