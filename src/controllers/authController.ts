import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { loginService, signupService, socialLoginService } from '../services/authService';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_google_client_id';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email ,userID: user.userID}, JWT_SECRET, { expiresIn: '7d' });
}

export async function signup(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await signupService({ firstName,lastName, email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await loginService({ email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function socialLogin(req, res) {
  try {
    const { provider, id_token, access_token } = req.body;
    const result = await socialLoginService({ provider, id_token, access_token });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
} 