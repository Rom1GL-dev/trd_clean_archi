import { Team } from './team.entity';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

export class Match {
  @ValidateNested()
  homeTeam: Team;

  @ValidateNested()
  awayTeam: Team;

  @IsNumber()
  homeScore: number;

  @IsNumber()
  awayScore: number;

  @IsString()
  tournament: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsDate()
  date: Date;

  totalGoals(): number {
    return this.homeScore + this.awayScore;
  }

  isDraw(): boolean {
    return this.homeScore === this.awayScore;
  }

  winner(): string {
    if (this.isDraw()) return 'Draw';
    return this.homeScore > this.awayScore
      ? this.homeTeam.label
      : this.awayTeam.label;
  }

  loser(): string {
    if (this.isDraw()) return 'Draw';
    return this.homeScore < this.awayScore
      ? this.homeTeam.label
      : this.awayTeam.label;
  }

  isWonBy(teamName: string): boolean {
    return this.winner() === teamName;
  }

  involves(teamName: string): boolean {
    return this.homeTeam.label === teamName || this.awayTeam.label === teamName;
  }
}
