import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { User } from '../../models/user.model';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { Role } from '../../constants/enums/role';
import { organizationSchema } from '../../validators/create-organization.validator';

export const UpdateOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { success, data, error } = organizationSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((x: any) => x.message);
      res
        .status(StatusCodes.BadRequest)
        .json({ success: false, error: errors });
      return;
    }

    const { id } = req.params;
    const { name, description } = data;
    const adminId = req.user?.id;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== Role.ADMIN) {
      res
        .status(StatusCodes.Forbidden)
        .json({ message: ErrorMessages.Auth.Unauthorized });
      return;
    }

    const organization = await Organization.findById(id);
    if (!organization) {
      res
        .status(StatusCodes.NotFound)
        .json({ message: ErrorMessages.Organization.NotFound });
      return;
    }

    const existingOrg = await Organization.findOne({ name });
    if (existingOrg && existingOrg.id !== id) {
      res
        .status(StatusCodes.Conflict)
        .json({ message: ErrorMessages.Organization.AlreadyExists });
      return;
    }

    organization.name = name;
    organization.description = description;
    await organization.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.Organization.UpdatedSuccessfully,
      organization,
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
