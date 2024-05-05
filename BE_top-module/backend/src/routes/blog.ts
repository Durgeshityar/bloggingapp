import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@durgeshityaar/medium-common2'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

//middleware -> get header -> verify -> next step

blogRouter.use(async (c, next) => {
  const header = c.req.header('authorization')

  try {
    if (!header) {
      c.status(401)
      return c.json({ error: 'unauthorized' })
    } else {
      const token = header.split(' ')[1]
      const response = await verify(token, c.env.JWT_SECRET)
      if (!response.id) {
        c.status(403)
        return c.json({ error: 'unauthorized' })
      } else {
        c.set('userId', response.id)
        await next()
      }
    }
  } catch (e) {
    console.log(`error in middleware ${e}`)
    return c.json(e)
  }
})

//post blog
blogRouter.post('/', async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  const { success } = createBlogInput.safeParse(body)
  if (!success) {
    c.status(401)
    return c.json({ error: 'invalid input' })
  } else {
    try {
      const post = await prisma.post.create({
        //@ts-ignore
        data: {
          title: body.title,
          content: body.content,
          authorId: parseInt(userId),
        },
      })
      return c.json({ id: post.id })
    } catch (e) {
      c.status(404)
      c.json({ message: `error while creating blog ${e}` })
    }
  }
})

// update blog
blogRouter.put('/', async (c) => {
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = updateBlogInput.safeParse(body)
  if (!success) {
    c.status(401)
    return c.json({ error: 'invalid input' })
  } else {
    try {
      await prisma.post.update({
        where: {
          id: body.id,
          authorId: parseInt(userId),
        },
        data: {
          title: body.title,
          content: body.content,
          id: body.id,
        },
      })
      return c.text('updated post')
    } catch (e) {
      c.status(404)
      c.json({ message: `error while updating blog  ${e}` })
    }
  }
})

//get blog by id
blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        content: true,
        createdAt: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return c.json({ post: post })
  } catch (e) {
    c.status(404)
    c.json({ message: `error while retriving  blog by id  ${e}` })
  }
})

// get post in bulk
blogRouter.get('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        createdAt: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return c.json({ blogs: posts })
  } catch (e) {
    c.status(500)
    return c.json({ message: `error while retrieving blogs in bulk: ${e}` })
  }
})
