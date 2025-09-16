const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Hash the default password
  const hashedPassword = await bcrypt.hash("password", 10);

  // Tenants
  const acme = await prisma.tenant.upsert({
    where: { slug: "acme" },
    update: {},
    create: {
      name: "Acme",
      slug: "acme",
      plan: "FREE"
    },
  });

  const globex = await prisma.tenant.upsert({
    where: { slug: "globex" },
    update: {},
    create: {
      name: "Globex",
      slug: "globex",
      plan: "FREE"
    },
  });

  // Users for Acme
  await prisma.user.upsert({
    where: { email: "admin@acme.test" },
    update: {},
    create: {
      email: "admin@acme.test",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: acme.id
    },
  });

  await prisma.user.upsert({
    where: { email: "user@acme.test" },
    update: {},
    create: {
      email: "user@acme.test",
      password: hashedPassword,
      role: "MEMBER",
      tenantId: acme.id
    },
  });

  // Users for Globex
  await prisma.user.upsert({
    where: { email: "admin@globex.test" },
    update: {},
    create: {
      email: "admin@globex.test",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: globex.id
    },
  });

  await prisma.user.upsert({
    where: { email: "user@globex.test" },
    update: {},
    create: {
      email: "user@globex.test",
      password: hashedPassword,
      role: "MEMBER",
      tenantId: globex.id
    },
  });
}

main()
  .then(async () => {
    console.log("✅ Database seeded with tenants and users");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
