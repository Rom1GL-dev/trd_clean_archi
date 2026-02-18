import { Injectable } from '@nestjs/common';
import { AbstractListMatchsPort } from '../../ports/in/list-matchs.port';
import { AbstractMatchRepository } from '../../ports/out/match.repository';
import { MatchMapper } from '../../mappers/match.mapper';

@Injectable()
export class ListMatchsQueryHandler extends AbstractListMatchsPort {
  constructor(private readonly matchRepository: AbstractMatchRepository) {
    super();
  }

  async execute() {
    const matchDtos = await this.matchRepository.list();

    if (!matchDtos || matchDtos.length === 0) {
      throw new Error('Matchs not found');
    }

    return matchDtos.map((dto) => MatchMapper.toDomain(dto));
  }
}