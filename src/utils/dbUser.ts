import User from '../models/User';

export async function createUser(userData) {
  return await User.create(userData);
}

export async function getUserByEmailAndProvider(email, provider) {
  return await User.findOne({ email, provider });
}

export async function getUserByProviderId(provider, providerId) {
  return await User.findOne({ provider, providerId });
}

export async function getAllUsers() {
  return await User.find();
} 