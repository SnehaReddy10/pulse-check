import { Request, Response } from 'express';
import { Organization } from '../../models/organization.model';
import { User } from '../../models/user.model';
import { ErrorMessages } from '../../constants/error-messages';
import { StatusCodes } from '../../constants/status-codes';
import { Role } from '../../constants/enums/role';
import { organizationSchema } from '../../validators/create-organization.validator';

export const CreateOrganizationController = async (
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

    const { name, description } = data;
    const adminId = req.user?.id;

    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== Role.ADMIN) {
      res
        .status(StatusCodes.Forbidden)
        .json({ message: ErrorMessages.Auth.Unauthorized });
      return;
    }

    const existingOrg = await Organization.findOne({ name });
    if (existingOrg) {
      res
        .status(StatusCodes.Conflict)
        .json({ message: ErrorMessages.Organization.AlreadyExists });
      return;
    }

    const organization = new Organization({
      name,
      description,
      admin: adminId,
    });
    await organization.save();

    res.status(StatusCodes.Created).json({
      message: ErrorMessages.Organization.CreatedSuccessfully,
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
