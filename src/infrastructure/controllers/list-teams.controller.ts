import { Controller, Get } from '@nestjs/common';
import { AbstractListTeamsPort } from '../../applications/ports/in/list-teams.port';

@Controller()
export class ListTeamsController {
  constructor(private readonly listTeamsPort: AbstractListTeamsPort) {}

  @Get('/teams')
  async listTeams() {
    return await this.listTeamsPort.execute();
  }
}
