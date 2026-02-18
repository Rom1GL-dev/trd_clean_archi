import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface CsvRow {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  tournament: string;
  city: string;
  country: string;
}

@Injectable()
export class CsvDataService {
  private rows: CsvRow[] = [];
  private loaded = false;

  getRows(): CsvRow[] {
    this.load();
    return this.rows;
  }

  private load(): void {
    if (this.loaded) return;

    const csvPath = path.join(process.cwd(), 'docs', 'data.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

    this.rows = lines.slice(1).map((line) => {
      const cols = line.split(',');
      return {
        date: cols[0],
        homeTeam: cols[1],
        awayTeam: cols[2],
        homeScore: Number(cols[3]),
        awayScore: Number(cols[4]),
        tournament: cols[5],
        city: cols[6],
        country: cols[7],
      };
    });

    this.loaded = true;
  }
}
