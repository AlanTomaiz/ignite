import multer from 'multer';
import { resolve } from 'path';

import { slugString } from '@utils/slug';

const upload = (folder = './temp') => ({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', folder),
    filename: (request, { originalname }, callback) => {
      const filename = `${new Date().getTime()}-${slugString(originalname)}`;
      return callback(null, filename);
    },
  }),
});

export { upload };
