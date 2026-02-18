import { Injectable } from '@nestjs/common';
import { AbstractTeamRepository } from '../../applications/ports/out/team.repository';
import { TeamDataDto } from '../../applications/ports/out/team-data.dto';
import { CsvDataService } from '../services/csv.service';

@Injectable()
export class TeamInmemoryRepository implements AbstractTeamRepository {
  constructor(private readonly csvDataService: CsvDataService) {}

  list(): TeamDataDto[] {
    const rows = this.csvDataService.getRows();
    const labels = new Set<string>();

    for (const row of rows) {
      labels.add(row.homeTeam);
      labels.add(row.awayTeam);
    }

    return Array.from(labels)
      .sort((a, b) => a.localeCompare(b))
      .map((label) => ({ label, matches: [] }));
  }
}
