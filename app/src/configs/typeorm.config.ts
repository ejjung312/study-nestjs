import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '139.150.74.240',
  port: 3306,
  username: 'nestjs',
  password: 'qwer1234!@#',
  database: 'nestjsDB',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 모든 엔티티를 포함
  synchronize: true, // 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 됨
  logging: false, // 쿼리로그
};
