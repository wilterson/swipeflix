import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { LikeModule } from './like/like.module';
import config from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    // TypeOrmModule.forRoot({
    //   type: process.env.TYPEORM_CONNECTION as any,
    //   host: process.env.TYPEORM_HOST,
    //   port: parseInt(process.env.TYPEORM_PORT),
    //   username: process.env.TYPEORM_USERNAME,
    //   password: process.env.TYPEORM_PASSWORD,
    //   database: process.env.TYPEORM_DATABASE,
    //   entities: ['dist/**/*.entity.js'],
    // }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    MovieModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
