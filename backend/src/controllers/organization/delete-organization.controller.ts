import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { Service } from '../../models/service.model';
import { User } from '../../models/user.model';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { Role } from '../../constants/enums/role';

export const DeleteOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.params.organizationId;
    const adminId = req.user?.id;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== Role.ADMIN) {
      res.status(StatusCodes.Forbidden).json({
        message: ErrorMessages.Auth.Unauthorized,
      });
      return;
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      res.status(StatusCodes.NotFound).json({
        message: ErrorMessages.Organization.NotFound,
      });
      return;
    }

    await Service.deleteMany({ organization: organizationId });

    await Organization.findByIdAndDelete(organizationId);

    res.status(StatusCodes.OK).json({
      message: 'Organization and its related services deleted successfully',
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
