import { PrismaClient, RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Create all roles
  const roleNames: RoleName[] = ['SUPER_ADMIN', 'ADMIN_YAYASAN', 'ADMIN_SMP', 'ADMIN_SMA', 'EDITOR', 'GUEST'];
  const roles: Record<string, { id: string }> = {};
  for (const name of roleNames) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 2. Create the initial Super Admin account
  // IMPORTANT: change this password immediately after first login.
  const passwordHash = await bcrypt.hash('ChangeMe!12345', 10);
  await prisma.user.upsert({
    where: { email: 'superadmin@takwinul-ummah.sch.id' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@takwinul-ummah.sch.id',
      passwordHash,
      roleId: roles.SUPER_ADMIN.id,
    },
  });

  // 3. Seed the Foundation record (single row)
  await prisma.foundation.upsert({
    where: { id: 'foundation-takwinul-ummah' },
    update: {},
    create: {
      id: 'foundation-takwinul-ummah',
      legalName: 'Yayasan Takwinul Ummah',
      shortName: 'Takwinul Ummah',
      address: 'Jl. Pendidikan No. 45, Banjar, Jawa Barat',
      phone: '+62 812-3456-7890',
      email: 'info@takwinul-ummah.sch.id',
      history: 'Didirikan pada tahun 1998...',
    },
  });

  console.log('Seed complete. Super Admin: superadmin@takwinul-ummah.sch.id / ChangeMe!12345');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
