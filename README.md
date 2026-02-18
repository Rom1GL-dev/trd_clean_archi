# TRD Analytics - Romain GILOT

Salut Alex ! 

## Installation du projet
Cloner le projet :
```
git clone git@github.com:Rom1GL-dev/trd_clean_archi.git
cd trd_clean_archi
```

Installer les dépendances :
```
npm i
```

Ajouter le .env à la racine :
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/trd"
```

Lancer la base de données PostgreSQL :
```
docker compose up db -d
```

Lancer les migrations Prisma :
```
npx prisma migrate dev
```

Rajouter les valeurs du csv la base de données :
```
npx prisma db seed
```

## Lancement du projet
Lancer le projet en mode CLI :
```
npm run cli
```

Lancer le projet en mode API :
```
npm run start:dev
```

## Lancement des tests
```
npm run test
```

## Lancer avec Docker (tout-en-un)
Lancer l'application et la base de données via Docker :
```
docker compose up
```

---
## TRD 2 - Diagramme 

## TRD 3 - Réponses aux question : 
**1. Combien de matchs la France a-t-elle joué au total ? Combien à domicile et combien à l'extérieur ?**

Total : 931 match
Domicile : 536
Extérieur : 395

**2. Où le Brésil marque-t-il le plus de buts (domicile ou extérieur) ?**

Au domicile, il marque 1498 buts contre 795 à l'extérieur

**3. Quel est le taux de victoire de l'Allemagne à domicile vs à l'extérieur ?**

Domicile : 61,96%
Exterieur : 53,26%

**4. Est-ce que l'Argentine a un meilleur taux de victoire à l'extérieur que l'Angleterre ?**

Argentine : 39,74%
Angleterre : 52,41 %

Non, c'est les anglais les plus forts à l'extérieur

**5. Entre la France et l'Italie, laquelle encaisse le moins de buts à domicile ?**

France : 585
Italie : 394

L'Italie encaisse moins de buts à domicile

**6. Entre l'Espagne et le Portugal, laquelle a le plus grand nombre de matchs nuls à l'extérieur ?**

Espagne : 106
Portugal : 69

L'Espagne a le plus grand nombre de nuls à l'extérieur

**7. Quelle équipe possède le meilleur taux de victoire à domicile parmi les équipes suivantes : France, Brésil, Allemagne, Argentine ?**

Brésil : 71,31%

**8. Quelle équipe a la plus grande différence entre ses buts marqués à domicile et ses buts marqués à l'extérieur (c'est-à-dire, la plus "dépendante" de la localisation du match) ?**

Brésil, 498 buts à domicile et 795 à l'extérieur, il y 703 but de différent


**9. Existe-t-il une équipe parmi France, Brésil, Angleterre, Italie qui gagne plus souvent à l'extérieur qu'à domicile ?**

Non, aucune équipes gagne plus souvent à l'extérieur

**10. Quelle équipe a le ratio buts marqués / buts encaissés le plus élevé à l'extérieur parmi : France, Allemagne, Brésil, Argentine ?**

C'est le Brésil avec un ratio de 1,74

**11. Quel est le nombre de défaites à domicile du Brésil ? Ce chiffre est-il cohérent avec son taux de victoire à domicile et son nombre de nuls à domicile ?**

60 sur 610 matchs 

Victoires : 435 
Nuls : 115 
Défaites : 60 

Total : 610

Donc oui c'est cohérent