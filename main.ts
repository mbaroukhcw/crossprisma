import { PrismaClient as VisitorClient, Model1 } from ".prisma/visitor/";
import { PrismaClient as CenterClient } from ".prisma/center";

const main = async () => {
  const visitor = new VisitorClient({
    datasources: {
      db: {
        url: "file:../visitor.db",
      },
    },
  });
  const center = new CenterClient({
    datasources: {
      db: {
        url: "file:../center.db",
      },
    },
  });

  await visitor.model1.findFirst();
  await center.model2.findFirst();

  // This will obviously not work on 2 sqlite dbs, but should on postgres
  await visitor.$queryRaw<Model1>`select m1.* from model1 m1, model2 m2 where m1.id=m2.id`;
};

main();
