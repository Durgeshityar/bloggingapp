import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const tester = await prisma.user.upsert({
    where: { email: 'tester@gmail.com' },
    update: {},
    create: {
      email: 'tester@gmail.com',
      name: 'Tester V1',
      password: 'tester',
      About: ' Hey im the first terster of this app',
      posts: {
        create: {
          title: 'How to create Post on Medium',
          content:
            'Sharing your ideas on Medium is easy! Craft a catchy headline and subheading, then write your post using the user-friendly editor. Optimize discovery with relevant tags and an attractive image. Choose to publish directly or submit to a themed publication for wider reach. Proofread, promote, and engage with readers to build your audience and become a Medium writing star.',
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
