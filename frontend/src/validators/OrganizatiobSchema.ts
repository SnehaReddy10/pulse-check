import * as Yup from 'yup';

export const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Organization name must be at least 3 characters')
    .required('Organization name is required'),
  description: Yup.string().optional(),
});
