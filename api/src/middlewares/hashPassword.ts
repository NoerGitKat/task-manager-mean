import bcrypt from "bcryptjs";

const hashPassword = async (user: any, salts: number, password: string) => {
  try {
    const salt = await bcrypt.genSalt(salts);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default hashPassword;
