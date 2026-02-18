import { Injectable } from '@nestjs/common';
import { Team } from '../../../domains/team.entity';

@Injectable()
export abstract class AbstractListTeamsPort {
  abstract execute(): Promise<Team[]>;
}
