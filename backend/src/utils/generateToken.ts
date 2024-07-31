import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: '2d'
    });
};
    
export default generateToken;