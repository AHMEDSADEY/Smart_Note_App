import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${nanoid(6)}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });