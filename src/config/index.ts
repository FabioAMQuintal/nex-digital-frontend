import dotenv from "dotenv";

dotenv.config();

export default {
    url: {
        baseUrlLocal: process.env.BASE_URL_LOCAL as string,
        prefix: process.env.PREFIX as string,
        signin: process.env.SIGNIN as string
    }
};
