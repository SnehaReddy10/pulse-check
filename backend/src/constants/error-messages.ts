export const ErrorMessages = {
  User: {
    NameIsRequired: 'Name is required',
    NameIsLong: 'Name is too long',
    InvalidEmail: 'Invalid email format',
    PasswordIsShort: 'Password must be at least 6 characters long',
    PasswordIsLong: 'Password is too long',
    EmailAlreadyInUse: 'Email already in use',
    UserCreatedSuccessfully: 'User created successfully',
    UserNotFound: 'User not found. Please check your credentials.',
    InvalidCredentials: 'Invalid email or password.',
    SignInSuccessful: 'Sign-in successful.',
    Forbidden: 'You do not have the required permissions.',
  },
  Auth: {
    Forbidden: 'You do not have permission to perform this action.',
    Unauthorized: 'Unauthorized access. Please log in.',
    InvalidToken: 'Invalid authentication token.',
  },
  Organization: {
    NameIsRequired: 'Organization name is required.',
    IDRequired: 'Organization ID is required.',
    NotFound: 'Organization not found.',
    AlreadyExists: 'An organization with this name already exists.',
    CreatedSuccessfully: 'Organization created successfully.',
  },
  Service: {
    NameRequired: 'Service name is required.',
    StatusInvalid:
      'Invalid service status. Choose from: Operational, Degraded Performance, Partial Outage, Major Outage.',
    CreatedSuccessfully: 'Service created successfully.',
    OrganizationIdRequired: 'Organization ID is required to fetch services.',
    ServiceNotFound: 'No services found for this organization.',
  },
  Server: {
    InternalServerError: 'Something went wrong. Please try again later.',
  },
};
