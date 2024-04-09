import  express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profiles/');
    } else if (file.fieldname === 'productImage') {
      cb(null, 'uploads/products/');
    } else {
      cb(null, 'uploads/documents/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });