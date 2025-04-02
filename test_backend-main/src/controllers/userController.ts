import { Request, Response } from 'express';
import { User } from '../typeORM/schema.typeORM.js';
import { DatabaseConnection } from '../typeORM/data-source.js';
import crypto from 'crypto';

const userRepository = DatabaseConnection.getRepository(User);

const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: 400,
                message: "Username or password are missing"
            });
        }

        const user = new User();
        user.username = username;
        user.password = hashPassword(password);

        const existingUser = await userRepository.findOne({ where: { username: user.username } });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "Username is already in use"
            });
        }

        await userRepository.save(user);

        return res.status(200).json({
            status: 200,
            message: "El usuario se creó correctamente"
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            status: 500,
            message: "An error occurred while creating the user"
        });
    }
}; 