import { Match } from '../../domains/match.entity';
import { Team } from '../../domains/team.entity';
import { MatchDataDto } from '../ports/out/match-data.dto';

export class MatchMapper {
  static toDomain(dto: MatchDataDto): Match {
    const match = new Match();

    const homeTeam = new Team();
    homeTeam.label = dto.homeTeamLabel;
    match.homeTeam = homeTeam;

    const awayTeam = new Team();
    awayTeam.label = dto.awayTeamLabel;
    match.awayTeam = awayTeam;

    match.homeScore = dto.homeScore;
    match.awayScore = dto.awayScore;
    match.tournament = dto.tournament;
    match.city = dto.city;
    match.country = dto.country;
    match.date = dto.date;

    return match;
  }
}
