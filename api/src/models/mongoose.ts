import { connect } from "mongoose";

const connectDB = async () => {
  const opts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  try {
    await connect(process.env.MONGO_SRV as string, opts);
  } catch (err) {
    console.error("Database error!", err);
  }
};

export default connectDB;
