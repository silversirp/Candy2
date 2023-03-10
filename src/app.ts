import express, { Request, Response, Express  } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma: PrismaClient = new PrismaClient();

// Middleware
app.use(express.json());

// Routes
app.get('/candies', async (req: Request, res: Response) => {
    try {
        const candies = await prisma.candy.findMany();
        res.json(candies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/candies', async (req: Request, res: Response) => {
    try {
        const candy = await prisma.candy.create({
            data: {
                name: req.body.name,
                flavor: req.body.flavor,
                color: req.body.color,
                priceCents: req.body.priceCents,
            },
        });
        res.json(candy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app
