import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './collections.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  providers: [CollectionsResolver, CollectionsService, PrismaService],
  exports: [CollectionsResolver, CollectionsService],
})
export class CollectionsModule {}
