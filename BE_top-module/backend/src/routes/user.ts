import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@durgeshityaar/medium-common2'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  //prisma client & accelerate
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  //requesting body in hono
  const body = await c.req.json()

  const { success } = signupInput.safeParse(body)
  if (!success) {
    c.status(401)
    return c.json({ message: ' invalid inputs' })
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      })

      const token = await sign({ id: user.id }, c.env.JWT_SECRET)

      return c.json({
        jwt: token,
      })
    } catch (e) {
      c.status(404)
      c.json({ message: `error while signing up  ${e}` })
    }
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)
  if (!success) {
    c.status(401)
    return c.json({ message: ' invalid inputs' })
  } else {
    try {
      const user = await prisma.user.findFirst({
        //@ts-ignore
        where: {
          email: body.email,
          password: body.password,
        },
      })
      if (!user) {
        c.status(403)
        return c.json({ error: 'user not found' })
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ jwt: jwt })
    } catch (e) {
      c.status(404)
      c.json({ message: `error while logging in  ${e}` })
    }
  }
})

// check follower
userRouter.get('/client', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const { userId, targetUserId } = await c.req.json()
  } catch (e) {
    c.status(404)
    c.json({ message: `error while retriving  followdetails/client ${e}` })
  }
})

// add follower/following

// remove follower
