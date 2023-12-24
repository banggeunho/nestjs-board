import { UserEntity } from 'src/modules/user/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    await repository.insert({
      username: 'geunho',
      name: 'banggeunho',
      password: '1234',
    });
  }
}
