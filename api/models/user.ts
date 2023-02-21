import { InferSchemaType, Schema, model, Document } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

interface DocumentResult {
  _doc: any;
}

type User = InferSchemaType<typeof userSchema> & DocumentResult;

export default model<User>("User", userSchema);
