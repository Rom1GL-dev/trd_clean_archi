import { Injectable } from '@nestjs/common';
import { AbstractMatchRepository } from '../../../applications/ports/out/match.repository';
import { MatchDataDto } from '../../../applications/ports/out/match-data.dto';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class MatchPrismaRepository implements AbstractMatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<MatchDataDto[]> {
    const rows = await this.prisma.match.findMany({
      include: { homeTeam: true, awayTeam: true },
    });

    return rows.map((row) => ({
      homeTeamLabel: row.homeTeam.label,
      awayTeamLabel: row.awayTeam.label,
      homeScore: row.homeScore,
      awayScore: row.awayScore,
      tournament: row.tournament,
      city: row.city,
      country: row.country,
      date: row.date,
    }));
  }

  async listMatchByTeam(teamName: string): Promise<MatchDataDto[]> {
    const rows = await this.prisma.match.findMany({
      where: {
        OR: [
          { homeTeam: { label: teamName } },
          { awayTeam: { label: teamName } },
        ],
      },
      include: { homeTeam: true, awayTeam: true },
    });

    return rows.map((row) => ({
      homeTeamLabel: row.homeTeam.label,
      awayTeamLabel: row.awayTeam.label,
      homeScore: row.homeScore,
      awayScore: row.awayScore,
      tournament: row.tournament,
      city: row.city,
      country: row.country,
      date: row.date,
    }));
  }
}
