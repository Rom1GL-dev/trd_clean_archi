import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    await this.$connect();

    const matchCount = await this.match.count();
    if (matchCount === 0) {
      execSync('npx prisma db seed', { stdio: 'inherit' });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
