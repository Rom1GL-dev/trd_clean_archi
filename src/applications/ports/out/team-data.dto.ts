import { MatchDataDto } from './match-data.dto';

export interface TeamDataDto {
  label: string;
  matches: MatchDataDto[];
}
