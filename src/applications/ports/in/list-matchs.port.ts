import { Injectable } from '@nestjs/common';
import { Match } from '../../../domains/match.entity';

@Injectable()
export abstract class AbstractListMatchsPort {
  abstract execute(): Promise<Match[]>;
}
