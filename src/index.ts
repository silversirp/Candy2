import { PrismaClient } from '@prisma/client'
import app from './app';

const prisma = new PrismaClient()

async function main() {
    const candy = await prisma.candy.create({
        data: {
            name: 'Gummy Bears',
            flavor: 'Assorted',
            color: 'Rainbow',
            priceCents: 299,
        },
    })
    console.log(candy)
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
