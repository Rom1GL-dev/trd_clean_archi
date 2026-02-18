import { Team } from '../../domains/team.entity';
import { TeamDataDto } from '../ports/out/team-data.dto';
import { MatchMapper } from './match.mapper';

export class TeamMapper {
  static toDomain(dto: TeamDataDto): Team {
    const team = new Team();
    team.label = dto.label;
    team.matches = dto.matches.map((m) => MatchMapper.toDomain(m));
    return team;
  }
}
