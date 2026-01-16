import { prisma } from "../src/db/prismaClient";

async function main() {
  
  await prisma.movie.create({
    data: {
      title: "Inception",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      release: new Date("2010-07-16")
    }
  });

  await prisma.movie.create({
    data: {
      title: "The Matrix",
      overview: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
      release: new Date("1999-03-31")
    }
  });

  await prisma.movie.create({
    data: {
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      release: new Date("2014-11-07")
    }
  });

  console.log("Postgres seed done");
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
