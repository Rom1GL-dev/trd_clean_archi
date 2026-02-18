import { Injectable } from '@nestjs/common';
import { MatchDataDto } from './match-data.dto';

@Injectable()
export abstract class AbstractMatchRepository {
  abstract list(): Promise<MatchDataDto[]> | MatchDataDto[];
  abstract listMatchByTeam(
    teamName: string,
  ): Promise<MatchDataDto[]> | MatchDataDto[];
}
