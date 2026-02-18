import { Injectable } from '@nestjs/common';
import { AbstractTeamRepository } from '../../../applications/ports/out/team.repository';
import { TeamDataDto } from '../../../applications/ports/out/team-data.dto';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class TeamPrismaRepository implements AbstractTeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<TeamDataDto[]> {
    const rows = await this.prisma.team.findMany({
      include: {
        homeMatches: { include: { homeTeam: true, awayTeam: true } },
        awayMatches: { include: { homeTeam: true, awayTeam: true } },
      },
      orderBy: { label: 'asc' },
    });

    return rows.map((row) => ({
      label: row.label,
      matches: [...row.homeMatches, ...row.awayMatches].map((m) => ({
        homeTeamLabel: m.homeTeam.label,
        awayTeamLabel: m.awayTeam.label,
        homeScore: m.homeScore,
        awayScore: m.awayScore,
        tournament: m.tournament,
        city: m.city,
        country: m.country,
        date: m.date,
      })),
    }));
  }
}
