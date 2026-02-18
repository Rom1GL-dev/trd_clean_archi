import { IsString, ValidateNested } from 'class-validator';
import { Match } from './match.entity';

export class Team {
  @IsString()
  label: string;

  @ValidateNested()
  matches: Match[] = [];

  victories(): Match[] {
    return this.matches.filter((match) => match.isWonBy(this.label));
  }

  defeats(): Match[] {
    return this.matches.filter(
      (match) => !match.isDraw() && !match.isWonBy(this.label),
    );
  }

  draws(): Match[] {
    return this.matches.filter((match) => match.isDraw());
  }

  victoriesRate(): number {
    if (this.matches.length === 0) return 0;
    return this.victories().length / this.matches.length;
  }

  goalsScored(): number {
    return this.matches.reduce((total, match) => {
      if (match.homeTeam.label === this.label) {
        return total + match.homeScore;
      }
      return total + match.awayScore;
    }, 0);
  }

  goalsConceded(): number {
    return this.matches.reduce((total, match) => {
      if (match.homeTeam.label === this.label) {
        return total + match.awayScore;
      }
      return total + match.homeScore;
    }, 0);
  }
}
