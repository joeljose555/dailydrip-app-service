import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Categories';
import DEFAULT_CATEGORIES from '../mappings/categoryMappings';
dotenv.config();

async function seedCategories() {
  for (const name of DEFAULT_CATEGORIES) {
    await Category.updateOne(
      { name },
      { $setOnInsert: { name, isActive: true } },
      { upsert: true }
    );
  }
  console.log('Default categories seeded');
}

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      // useNewUrlParser and useUnifiedTopology are default in mongoose >= 6
    });
    console.log('MongoDB connected successfully');
    //await seedCategories();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
