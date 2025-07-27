import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import AppleStrategy from 'passport-apple';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { createUser, getUserByEmailAndProvider, getUserByProviderId } from '../utils/dbUser';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '616886846838-8lcjiru22ps0u01vph9hpbfbcvilq3nn.apps.googleusercontent.com';
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'your_facebook_app_id';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'your_facebook_app_secret';
const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID || 'your_apple_client_id';
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID || 'your_apple_team_id';
const APPLE_KEY_ID = process.env.APPLE_KEY_ID || 'your_apple_key_id';
const APPLE_PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY || 'your_apple_private_key';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

export async function signupService({ firstName, lastName,email, password }) {
  const existing = await getUserByEmailAndProvider(email, 'local');
  if (existing) throw new Error('User exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ firstName,lastName, email, password: hashedPassword, provider: 'local', userID: uuidv4() });
  const token = generateToken(user);
  return { token };
}

export async function loginService({ email, password }) {
  const user = await getUserByEmailAndProvider(email, 'local');
  if (!user) throw new Error('Invalid credentials');
  if (!user.password) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  const token = generateToken(user);
  return { token };
}

export async function socialLoginService({ provider, id_token, access_token }) {
  let profile;
  if (provider === 'google') {
    const ticket = await googleClient.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid Google token');
    profile = { email: payload.email, providerId: payload.sub, name: payload.name };
  } else if (provider === 'facebook') {
    // Use Passport Facebook strategy to verify access_token
    // This is a simplified version, in production use passport.authenticate middleware
    return new Promise((resolve, reject) => {
      passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name']
      }, async (accessToken, refreshToken, fbProfile, done) => {
        try {
          const email = fbProfile.emails && fbProfile.emails[0].value;
          const providerId = fbProfile.id;
          const name = fbProfile.displayName || `${fbProfile.name.givenName} ${fbProfile.name.familyName}`;
          let user = await getUserByProviderId('facebook', providerId);
          if (!user) {
            user = await createUser({ email, provider: 'facebook', providerId, name, userID: email });
          }
          const token = generateToken(user);
          resolve({ token });
        } catch (err) {
          reject(err);
        }
      }));
      // Simulate passport authentication
      passport.authenticate('facebook', { session: false })(
        { query: { access_token } }, {}, () => {}
      );
    });
  } else if (provider === 'apple') {
    // Use Passport Apple strategy to verify id_token
    return new Promise((resolve, reject) => {
      passport.use(new AppleStrategy({
        clientID: APPLE_CLIENT_ID,
        teamID: APPLE_TEAM_ID,
        keyID: APPLE_KEY_ID,
        privateKey: APPLE_PRIVATE_KEY,
        callbackURL: '/auth/apple/callback',
      }, async (accessToken, refreshToken, idToken, appleProfile, done) => {
        try {
          const email = appleProfile.email;
          const providerId = appleProfile.id;
          const name = appleProfile.displayName || '';
          let user = await getUserByProviderId('apple', providerId);
          if (!user) {
            user = await createUser({ email, provider: 'apple', providerId, name, userID: email });
          }
          const token = generateToken(user);
          resolve({ token });
        } catch (err) {
          reject(err);
        }
      }));
      // Simulate passport authentication
      passport.authenticate('apple', { session: false })(
        { body: { id_token } }, {}, () => {}
      );
    });
  }
  // Default: Google (already handled above)
  let user = await getUserByProviderId(provider, profile.providerId);
  if (!user) {
    user = await createUser({
      email: profile.email,
      provider: provider,
      providerId: profile.providerId,
      name: profile.name,
      userID: profile.email,
    });
  }
  const token = generateToken(user);
  return { token };
} 