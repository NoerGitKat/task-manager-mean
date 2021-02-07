import bcrypt from "bcryptjs";

const comparePassword = async (loginPassword: string, realPassword: string) => {
  const isValid = await bcrypt.compare(loginPassword, realPassword);
  return isValid;
};

export default comparePassword;
