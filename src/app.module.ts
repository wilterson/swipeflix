import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User]),
    UserModule,
    MovieModule,
    LikeModule,
    AuthModule,
  ],
})
export class AppModule {}
