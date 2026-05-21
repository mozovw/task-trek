import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { Checkin } from './entities/checkin.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { StatsModule } from './modules/stats/stats.module';
import { ExportModule } from './modules/export/export.module';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/app.db',
      entities: [User, Task, Checkin],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    TaskModule,
    CheckinModule,
    StatsModule,
    ExportModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.userRepository.count();
    if (count === 0) {
      const admin = new User();
      admin.username = 'admin';
      admin.passwordHash = await bcrypt.hash('123456', 10);
      admin.name = '管理员';
      admin.isAdmin = true;
      await this.userRepository.save(admin);
      console.log('Default admin account created: admin/123456');
    }
  }
}
