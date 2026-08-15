import { User } from './models/index.js';
import { connectDB } from './config/db.js';

async function test() {
  await connectDB();
  const faculty = await User.findOne({ where: { prnNumber: 'FACULTY01' } });
  console.log("Faculty found:", faculty !== null);
  if (faculty) {
    console.log("Faculty password hash:", faculty.password);
    const match = await faculty.matchPassword('faculty');
    console.log("Password matches 'faculty':", match);
  }
  process.exit();
}
test();
