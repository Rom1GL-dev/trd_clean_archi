import { Injectable } from '@nestjs/common';
import { AbstractMatchRepository } from '../../applications/ports/out/match.repository';
import { MatchDataDto } from '../../applications/ports/out/match-data.dto';
import { CsvDataService } from '../services/csv.service';

@Injectable()
export class MatchInmemoryRepository implements AbstractMatchRepository {
  constructor(private readonly csvDataService: CsvDataService) {}

  list(): MatchDataDto[] {
    const rows = this.csvDataService.getRows();
    return rows.map((row) => {
      return {
        homeTeamLabel: row.homeTeam,
        awayTeamLabel: row.awayTeam,
        homeScore: row.homeScore,
        awayScore: row.awayScore,
        tournament: row.tournament,
        city: row.city,
        country: row.country,
        date: new Date(row.date),
      };
    });
  }

  listMatchByTeam(teamName: string): MatchDataDto[] {
    const rows = this.csvDataService.getRows();
    return rows
      .filter(
        (row) =>
          row.homeTeam.toLowerCase() === teamName.toLowerCase() ||
          row.awayTeam.toLowerCase() === teamName.toLowerCase(),
      )
      .map((row) => {
        return {
          homeTeamLabel: row.homeTeam,
          awayTeamLabel: row.awayTeam,
          homeScore: row.homeScore,
          awayScore: row.awayScore,
          tournament: row.tournament,
          city: row.city,
          country: row.country,
          date: new Date(row.date),
        };
      });
  }
}
