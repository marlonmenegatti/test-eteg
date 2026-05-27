import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const rainbowColors = [
  { name: 'Vermelho', hex: '#FF0000', active: true },
  { name: 'Laranja', hex: '#FF7F00', active: true },
  { name: 'Amarelo', hex: '#FFFF00', active: true },
  { name: 'Verde', hex: '#00FF00', active: true },
  { name: 'Azul', hex: '#0000FF', active: true },
  { name: 'Anil', hex: '#4B0082', active: true },
  { name: 'Violeta', hex: '#8B00FF', active: true },
]

async function main() {
  for (const color of rainbowColors) {
    await prisma.color.upsert({
      where: { name: color.name },
      update: {},
      create: color,
    })
  }
  console.log('Seed completed: rainbow colors inserted')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })
