import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3003;
const SECRET_KEY = 'Secure message';
const blacklistedTokens = new Set<string>();

const verifySignature = (address: string, message: string, signature: string): boolean => {
    const publicKeyBytes = new PublicKey(address).toBytes();
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = Uint8Array.from(Buffer.from(signature, 'base64'));

    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
};

const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token should be provided' });
        return;
    }

    if (blacklistedTokens.has(token)) {
        res.status(401).json({ message: 'Token is invalidated' });
        return;
    }

    next();
};

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/profile', checkAuth, (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token should be provided' });
            return;
        }

        const verified = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        if (!verified.address) {
            res.status(400).json({ message: 'Could not verify signature' });
            return;
        }

        res.json({ address: verified.address });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/login', (req: Request, res: Response) => {
    const { message, address, signature }: { message: string; address: string; signature: string } = req.body;

    try {
        const isVerified = verifySignature(address, message, signature);

        if (!isVerified) {
            res.status(400).json({ message: 'Invalid signature' });
            return;
        }

        const token = jwt.sign({ address }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/logout', checkAuth, (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            blacklistedTokens.add(token);
            res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ message: 'Token is missing' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
