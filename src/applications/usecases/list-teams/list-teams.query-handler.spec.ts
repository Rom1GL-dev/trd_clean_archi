import { ListTeamsQueryHandler } from './list-teams.query-handler';
import { AbstractTeamRepository } from '../../ports/out/team.repository';
import { TeamDataDto } from '../../ports/out/team-data.dto';

describe('ListTeamsQueryHandler', () => {
  let handler: ListTeamsQueryHandler;
  let teamRepository: jest.Mocked<AbstractTeamRepository>;

  beforeEach(() => {
    teamRepository = {
      list: jest.fn(),
    } as jest.Mocked<AbstractTeamRepository>;
    handler = new ListTeamsQueryHandler(teamRepository);
  });

  it('doit return la liste des équipes', async () => {
    teamRepository.list.mockResolvedValue([
      { label: 'France', matches: [] },
      { label: 'Portugal', matches: [] },
    ] as TeamDataDto[]);

    const result = await handler.execute();

    expect(result).toHaveLength(2);
  });

  it("doit throw une erreur si il ne trouve pas d'équipe", async () => {
    teamRepository.list.mockResolvedValue([]);

    await expect(handler.execute()).rejects.toThrow('Teams not found');
  });
});
