import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { loginService, signupService, socialLoginService } from '../services/authService';
import { HttpStatus } from '../constants/httpStatus';
import { IUser, IUserCreateRequest, IUserLoginRequest, IUserSocialLoginRequest } from '../types/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_google_client_id';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function generateToken(user: IUser) {
  return jwt.sign({ id: user.userID, email: user.email, userID: user.userID }, JWT_SECRET, { expiresIn: '7d' });
}

export async function signup(req: any, res: any) {
  try {
    const { name, email, password }: IUserCreateRequest = req.body;
    const result = await signupService({ name, email, password });
    res.json(result);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: (err as Error).message });
  }
}

export async function login(req: any, res: any) {
  try {
    const { email, password }: IUserLoginRequest = req.body;
    const result = await loginService({ email, password });
    res.json(result);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: (err as Error).message });
  }
}

export async function socialLogin(req: any, res: any) {
  try {
    const { provider, id_token, access_token }: IUserSocialLoginRequest = req.body;
    const result = await socialLoginService({ provider, id_token, access_token });
    res.json(result);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: (err as Error).message });
  }
} 