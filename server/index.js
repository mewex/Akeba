import exp from "express";
import bodyParse from "body-parser";
import mongo from "mongoose";
import crossOrigin from "cors";
import envConfig from "dotenv";
import fileUpload from "multer";
import secureHelmet from "helmet";
import logMorgan from "morgan";
import pth from "path";
import { fileURLToPath } from "url";
import authRouting from "./routes/auth.js";
import userRouting from "./routes/users.js";
import postRouting from "./routes/posts.js";
import { register as reg } from "./controllers/auth.js";
import { createPost as createNewPost } from "./controllers/posts.js";
import { verifyToken as checkToken } from "./middleware/auth.js";
import UserModel from "./models/User.js";
import PostModel from "./models/Post.js";
import { users, posts } from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = pth.dirname(__filename);
envConfig.config();
const app = exp();
app.use(exp.json());
app.use(secureHelmet());
app.use(secureHelmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(logMorgan("common"));
app.use(bodyParse.json({ limit: "30mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "30mb", extended: true }));
app.use(crossOrigin());
app.use("/assets", exp.static(pth.join(__dirname, "public/assets")));

const fileStorage = fileUpload.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = fileUpload({ storage: fileStorage });

app.post("/auth/register", upload.single("picture"), reg);
app.post("/posts", checkToken, upload.single("picture"), createNewPost);

app.use("/auth", authRouting);
app.use("/users", userRouting);
app.use("/posts", postRouting);

const PORT = process.env.PORT || 6001;
mongo
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));
