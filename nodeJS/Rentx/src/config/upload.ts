import multer from 'multer';
import { resolve } from 'path';

const upload = (folder = './temp') => ({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', folder),
    filename: (request, { originalname }, callback) => {
      const filename = `${new Date().getTime()}-${originalname}`;
      return callback(null, filename);
    },
  }),
});

export { upload };
