import { Module } from '@nestjs/common';
import { ListTeamsController } from './infrastructure/controllers/list-teams.controller';
import { ListMatchsController } from './infrastructure/controllers/list-matchs.controller';
import { ListMatchsByTeamController } from './infrastructure/controllers/list-match-by-team.controller';
import { AbstractTeamRepository } from './applications/ports/out/team.repository';
import { AbstractMatchRepository } from './applications/ports/out/match.repository';
import { CsvDataService } from './infrastructure/services/csv.service';
import { AbstractListTeamsPort } from './applications/ports/in/list-teams.port';
import { ListTeamsQueryHandler } from './applications/usecases/list-teams/list-teams.query-handler';
import { AbstractListMatchsPort } from './applications/ports/in/list-matchs.port';
import { ListMatchsQueryHandler } from './applications/usecases/list-matchs/list-matchs.query-handler';
import { AbstractListMatchByTeamPort } from './applications/ports/in/list-match-by-team.port';
import {
  ListMatchsByTeamQueryHandler,
} from './applications/usecases/list-match-by-team/list-match-by-team.query-handler';
import { MatchPrismaRepository } from './infrastructure/adapters/persistence/match.prisma.repository';
import { TeamPrismaRepository } from './infrastructure/adapters/persistence/team.prisma.repository';
import { PrismaService } from './infrastructure/services/prisma.service';

@Module({
  imports: [],
  controllers: [
    ListTeamsController,
    ListMatchsController,
    ListMatchsByTeamController,
  ],
  providers: [
    PrismaService,
    CsvDataService,
    // IN
    { provide: AbstractListTeamsPort, useClass: ListTeamsQueryHandler },
    { provide: AbstractListMatchsPort, useClass: ListMatchsQueryHandler },
    {
      provide: AbstractListMatchByTeamPort,
      useClass: ListMatchsByTeamQueryHandler,
    },
    // OUT
    // IN memory
    // { provide: AbstractTeamRepository, useClass: TeamInmemoryRepository },
    // { provide: AbstractMatchRepository, useClass: MatchInmemoryRepository },
    // sql
    { provide: AbstractTeamRepository, useClass: TeamPrismaRepository },
    { provide: AbstractMatchRepository, useClass: MatchPrismaRepository },
  ],
})
export class AppModule {}
