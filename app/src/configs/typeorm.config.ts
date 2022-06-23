import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 모든 엔티티를 포함
  synchronize: true, // 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 됨
};
