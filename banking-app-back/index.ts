import express, { json, Request, Response, NextFunction } from "express";
import session from 'express-session';
import cors from 'cors';
import fs from "fs";
import { User } from "./types";
import { v4 as uuid } from "uuid";
import { handleError } from "./utils/errors";

const app = express();

declare module 'express-session' {
    interface SessionData {
        username?: string;
        userId?: string;
    }
}

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));

app.use(json());

app.use(session({
    secret: 'fb2d256bcbfe36c09b8b3d8f5cd5fc0a77bb736faed7efdf7b9a795fe137eef0',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 1
    }
}));

const dbUsers = './users.json';
const dbTransactions = './transactions.json';

const checkSession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.username || !req.session.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

app.post('/register', (req: Request, res: Response) => {
    const { username, password, balance } = req.body;
    try {
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const isPresent = users.some((el: User) => el.username === username);
        if (isPresent) {
            res.status(401).json({ message: 'Registration unsuccessful, user with such name already exists' });
        } else {
            const newId = uuid();
            const newUser: User = {
                id: newId,
                username,
                password,
                balance: Number(balance) || 0,
            };
            const newArray = [...users, newUser];
            fs.writeFileSync(dbUsers, JSON.stringify(newArray, null, 2));
            res.json({ message: 'Registration successful' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Registration unsuccessful due to an internal error' });
    }
});

app.post('/login', (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const user = users.find((el: User) => el.username === username && el.password === password);

        if (user) {
            req.session.username = username;
            req.session.userId = user.id;
            const resForFront = {
                id: user.id,
                username: user.username,
                balance: user.balance,
            }
            res.json({ message: 'Login successful', resForFront });
        } else {
            res.status(401).json({ message: 'Invalid login or password' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Login unsuccessful due to an internal error' });
    }
});

app.get('/api/user/me', (req: Request, res: Response) => {
    try {
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const user = users.find((el: User) => el.username === req.session.username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user.id,
            username: user.username,
            balance: user.balance
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
});

app.get('/api/users', checkSession, (req: Request, res: Response) => {
    try {
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const otherUsers = users.filter((el: User) => el.username !== req.session.username);

        if (!otherUsers) {
            return res.status(404).json({ message: 'No other users!' });
        }

        res.json(otherUsers);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Failed to fetch other users data' });
    }
});

app.get('/dashboard', checkSession, (req: Request, res: Response) => {
    try {
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const user = users.find((el: User) => el.username === req.session.username);
        res.json({ message: 'Welcome to your dashboard', user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to load dashboard' });
    }
});

app.post('/transfer', checkSession, (req: Request, res: Response) => {
    try {
        const { amount, recipient } = req.body;
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));
        const transactions = JSON.parse(fs.readFileSync(dbTransactions, 'utf-8'));

        const sender = users.find((el: User) => el.username === req.session.username);
        const recipientUser = users.find((el: User) => el.id === recipient);

        if (sender && recipientUser && sender.balance >= amount) {
            sender.balance -= Number(amount);
            recipientUser.balance += Number(amount);

            const newTransaction = {
                id: uuid(),
                sender_id: sender.id,
                recipient_id: recipientUser.id,
                amount: Number(amount),
                timestamp: new Date().toISOString()
            };

            transactions.push(newTransaction);

            fs.writeFileSync(dbUsers, JSON.stringify(users, null, 2));
            fs.writeFileSync(dbTransactions, JSON.stringify(transactions, null, 2));
            res.json({ message: `Transfer of ${amount}$ to a user:${recipient} was successful`, newTransaction });
        } else {
            res.status(400).json({ message: 'Transaction failed. Check recipient and balance.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Transfer unsuccessful due to an internal error' });
    }
});

app.get('/api/transactions', checkSession, (req: Request, res: Response) => {
    try {
        const transactions = JSON.parse(fs.readFileSync(dbTransactions, 'utf-8'));
        const users = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'));

        const user = users.find((el: User) => el.username === req.session.username);
        const userTransactions = transactions.filter(
            (t: any) => t.sender_id === user.id || t.recipient_id === user.id
        );

        res.json(userTransactions);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to retrieve transactions' });
    }
});

app.get('/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

app.get('/api/session/check', (req: Request, res: Response) => {
    try {
        res.json({ loggedIn: !!req.session.username });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to check session status' });
    }
});

app.use(handleError);

app.listen(3001, () => {
    console.log('Listening on port http://localhost:3001');
});
