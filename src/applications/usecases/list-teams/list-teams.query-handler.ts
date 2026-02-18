import { Injectable } from '@nestjs/common';
import { AbstractListTeamsPort } from '../../ports/in/list-teams.port';
import { AbstractTeamRepository } from '../../ports/out/team.repository';
import { TeamMapper } from '../../mappers/team.mapper';

@Injectable()
export class ListTeamsQueryHandler extends AbstractListTeamsPort {
  constructor(private readonly teamRepository: AbstractTeamRepository) {
    super();
  }

  async execute() {
    const teamDtos = await this.teamRepository.list();

    if (!teamDtos || teamDtos.length === 0) {
      throw new Error('Teams not found');
    }

    return teamDtos.map((dto) => TeamMapper.toDomain(dto));
  }
}
