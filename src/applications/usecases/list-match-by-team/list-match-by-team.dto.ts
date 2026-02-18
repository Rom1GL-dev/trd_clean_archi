import { IsString } from 'class-validator';

export class ListMatchByTeamDto {
  @IsString()
  teamName: string;
}
