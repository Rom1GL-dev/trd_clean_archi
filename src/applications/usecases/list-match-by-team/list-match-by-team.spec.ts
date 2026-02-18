/* eslint-disable @typescript-eslint/unbound-method */
import { ListMatchsByTeamQueryHandler } from './list-match-by-team.query-handler';
import { AbstractMatchRepository } from '../../ports/out/match.repository';
import { ListMatchByTeamQuery } from './list-match-by-team.query';
import { MatchDataDto } from '../../ports/out/match-data.dto';

function createMatchDto(
  homeLabel: string,
  awayLabel: string,
  homeScore: number,
  awayScore: number,
): MatchDataDto {
  return {
    homeTeamLabel: homeLabel,
    awayTeamLabel: awayLabel,
    homeScore,
    awayScore,
    tournament: 'Coupe du monde',
    city: 'Paris',
    country: 'France',
    date: new Date(),
  };
}

describe('ListMatchsByTeamQueryHandler', () => {
  let listMatchByTeamQueryHandler: ListMatchsByTeamQueryHandler;
  let matchRepository: jest.Mocked<AbstractMatchRepository>;

  beforeEach(() => {
    matchRepository = {
      list: jest.fn(),
      listMatchByTeam: jest.fn(),
    } as jest.Mocked<AbstractMatchRepository>;
    listMatchByTeamQueryHandler = new ListMatchsByTeamQueryHandler(
      matchRepository,
    );
  });

  it("doit return les matchs d'une equipe", async () => {
    matchRepository.listMatchByTeam.mockResolvedValue([
      createMatchDto('France', 'Portugal', 2, 0),
    ]);

    const query = new ListMatchByTeamQuery('France');
    const result = await listMatchByTeamQueryHandler.execute(query);

    expect(result).toHaveLength(1);
    expect(matchRepository.listMatchByTeam).toHaveBeenCalledWith('France');
  });

  it('doit return les matchs avec les bonnes donnees', async () => {
    matchRepository.listMatchByTeam.mockResolvedValue([
      createMatchDto('France', 'Portugal', 2, 0),
    ]);

    const query = new ListMatchByTeamQuery('France');
    const result = await listMatchByTeamQueryHandler.execute(query);

    expect(result[0].homeTeam.label).toBe('France');
    expect(result[0].awayTeam.label).toBe('Portugal');
    expect(result[0].homeScore).toBe(2);
    expect(result[0].awayScore).toBe(0);
  });

  it('doit return plusieurs matchs pour une equipe', async () => {
    matchRepository.listMatchByTeam.mockResolvedValue([
      createMatchDto('France', 'Portugal', 2, 0),
      createMatchDto('France', 'Allemagne', 1, 1),
    ]);

    const query = new ListMatchByTeamQuery('France');
    const result = await listMatchByTeamQueryHandler.execute(query);

    expect(result).toHaveLength(2);
  });

  it('doit appeler le repository avec le bon nom d equipe', async () => {
    matchRepository.listMatchByTeam.mockResolvedValue([
      createMatchDto('Allemagne', 'Portugal', 3, 1),
    ]);

    const query = new ListMatchByTeamQuery('Portugal');
    await listMatchByTeamQueryHandler.execute(query);

    expect(matchRepository.listMatchByTeam).toHaveBeenCalledWith('Portugal');
  });

  it('doit thow une erreur si aucun match trouve pour l equipe', async () => {
    matchRepository.listMatchByTeam.mockResolvedValue([]);

    const query = new ListMatchByTeamQuery('AlexCountry');

    await expect(listMatchByTeamQueryHandler.execute(query)).rejects.toThrow(
      'Matchs not found',
    );
  });

  it('doit lever une erreur si le repository retourne null', async () => {
    matchRepository.listMatchByTeam.mockResolvedValue(null as any);

    const query = new ListMatchByTeamQuery('France');

    await expect(listMatchByTeamQueryHandler.execute(query)).rejects.toThrow(
      'Matchs not found',
    );
  });
});
