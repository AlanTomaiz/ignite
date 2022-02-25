/* eslint no-empty: "off" */
import fs from 'fs';

const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
    fs.unlinkSync(filename);
  } catch {}
};

export { deleteFile };
