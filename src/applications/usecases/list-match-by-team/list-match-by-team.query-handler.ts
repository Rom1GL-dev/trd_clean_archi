import { Injectable } from '@nestjs/common';
import { AbstractListMatchByTeamPort } from '../../ports/in/list-match-by-team.port';
import { AbstractMatchRepository } from '../../ports/out/match.repository';
import { MatchMapper } from '../../mappers/match.mapper';
import { ListMatchByTeamQuery } from './list-match-by-team.query';

@Injectable()
export class ListMatchsByTeamQueryHandler extends AbstractListMatchByTeamPort {
  constructor(private readonly matchRepository: AbstractMatchRepository) {
    super();
  }

  async execute(query: ListMatchByTeamQuery) {
    const matchDtos = await this.matchRepository.listMatchByTeam(
      query.teamName,
    );

    if (!matchDtos || matchDtos.length === 0) {
      throw new Error('Matchs not found');
    }

    return matchDtos.map((dto) => MatchMapper.toDomain(dto));
  }
}
