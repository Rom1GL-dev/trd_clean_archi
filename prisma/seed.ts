import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const existingMatchCount = await prisma.match.count();
  if (existingMatchCount > 0) {
    console.log('bdd xiste deja');
    return;
  }

  const csvPath = path.join(__dirname, '..', 'docs', 'data.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  const rows = lines.slice(1).map((line) => {
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

  const teamNames = new Set<string>();
  for (const row of rows) {
    teamNames.add(row.homeTeam);
    teamNames.add(row.awayTeam);
  }

  for (const label of teamNames) {
    await prisma.team.upsert({
      where: { label },
      update: {},
      create: { label },
    });
  }

  const teams = await prisma.team.findMany();
  const teamMap = new Map(teams.map((t) => [t.label, t.id]));

  for (const row of rows) {
    await prisma.match.create({
      data: {
        homeTeamId: teamMap.get(row.homeTeam)!,
        awayTeamId: teamMap.get(row.awayTeam)!,
        homeScore: row.homeScore,
        awayScore: row.awayScore,
        tournament: row.tournament,
        city: row.city,
        country: row.country,
        date: new Date(row.date),
      },
    });
  }

  console.log('Seed créer');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());