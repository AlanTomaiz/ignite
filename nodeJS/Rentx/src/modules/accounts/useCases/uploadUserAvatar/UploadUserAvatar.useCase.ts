import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@utils/handleFiles';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class UploadUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_filename }): Promise<void> {
    const user = await this.repository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_filename;
    await this.repository.save(user);
  }
}

export { UploadUserAvatarUseCase };
