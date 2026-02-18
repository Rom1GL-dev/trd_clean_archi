import { Controller, Get } from '@nestjs/common';
import { AbstractListMatchsPort } from '../../applications/ports/in/list-matchs.port';

@Controller()
export class ListMatchsController {
  constructor(private readonly listMatchsPort: AbstractListMatchsPort) {}

  @Get('/matchs')
  async listMatchs() {
    return await this.listMatchsPort.execute();
  }
}
