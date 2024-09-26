import * as bcrypt from 'bcryptjs';

export const matchesHash = (
  hashedPassword: string,
  incomingPassword: string,
): boolean => {
  try {
    return bcrypt.compareSync(incomingPassword, hashedPassword);
  } catch (error) {
    return false;
  }
};

export const encodeString = (incomingPassword: string): string => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(incomingPassword, salt);
};
