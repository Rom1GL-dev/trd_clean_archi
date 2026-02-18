import { Injectable } from '@nestjs/common';
import { TeamDataDto } from './team-data.dto';

@Injectable()
export abstract class AbstractTeamRepository {
  abstract list(): Promise<TeamDataDto[]> | TeamDataDto[];
}
