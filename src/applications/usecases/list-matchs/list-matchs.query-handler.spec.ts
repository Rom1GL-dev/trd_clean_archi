import { ListMatchsQueryHandler } from './list-matchs.query-handler';
import { AbstractMatchRepository } from '../../ports/out/match.repository';
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

describe('ListMatchsQueryHandler', () => {
  let handler: ListMatchsQueryHandler;
  let matchRepository: jest.Mocked<AbstractMatchRepository>;

  beforeEach(() => {
    matchRepository = {
      list: jest.fn(),
      listMatchByTeam: jest.fn(),
    } as jest.Mocked<AbstractMatchRepository>;
    handler = new ListMatchsQueryHandler(matchRepository);
  });

  it('doit return la liste des matchs', async () => {
    matchRepository.list.mockResolvedValue([
      createMatchDto('France', 'Portugal', 3, 1),
    ]);

    const result = await handler.execute();

    expect(result).toHaveLength(1);
  });

  it('doit return les matchs', async () => {
    matchRepository.list.mockResolvedValue([
      createMatchDto('France', 'Portugal', 3, 1),
    ]);

    const result = await handler.execute();

    expect(result[0].homeTeam.label).toBe('France');
    expect(result[0].awayTeam.label).toBe('Portugal');
    expect(result[0].homeScore).toBe(3);
    expect(result[0].awayScore).toBe(1);
  });

  it('doit return plusieurs matchs', async () => {
    matchRepository.list.mockResolvedValue([
      createMatchDto('France', 'Portugal', 3, 1),
      createMatchDto('Allemagne', 'Espagne', 2, 2),
    ]);

    const result = await handler.execute();

    expect(result).toHaveLength(2);
  });

  it('doit throw une erreur si il ne trouve pas de match', async () => {
    matchRepository.list.mockResolvedValue([]);

    await expect(handler.execute()).rejects.toThrow('Matchs not found');
  });
});
