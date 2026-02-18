import { Injectable } from '@nestjs/common';
import { Match } from '../../../domains/match.entity';
import { ListMatchByTeamQuery } from '../../usecases/list-match-by-team/list-match-by-team.query';

@Injectable()
export abstract class AbstractListMatchByTeamPort {
  abstract execute(query: ListMatchByTeamQuery): Promise<Match[]>;
}
