import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '188.166.180.241',
    port: 5432,
    username: 'nestdb',
    password: '123456',
    database: 'nestdb',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};  
