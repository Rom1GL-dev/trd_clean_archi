import { Body, Controller, Get } from '@nestjs/common';
import { AbstractListMatchByTeamPort } from '../../applications/ports/in/list-match-by-team.port';
import { ListMatchByTeamQuery } from '../../applications/usecases/list-match-by-team/list-match-by-team.query';
import { ListMatchByTeamDto } from '../../applications/usecases/list-match-by-team/list-match-by-team.dto';

@Controller()
export class ListMatchsByTeamController {
  constructor(
    private readonly listMatchByTeamPort: AbstractListMatchByTeamPort,
  ) {}

  @Get('/matchs/team')
  async listMatchs(@Body() body: ListMatchByTeamDto) {
    if (!body.teamName) {
      throw new Error('teamName is required');
    }

    const query = new ListMatchByTeamQuery(body.teamName);

    return await this.listMatchByTeamPort.execute(query);
  }
}
