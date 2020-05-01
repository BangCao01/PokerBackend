// MongoDB connection
import { connect, connection } from 'mongoose';
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb+srv://root:lungbac15@cluster0-j9zmr.mongodb.net/test?retryWrites=true&w=majority'; // 'mongodb://localhost/project-management-system';

connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = connection;
// tslint:disable-next-line: no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // tslint:disable-next-line: no-console
  console.log('Connected to ' + process.env.MONGODB_URI);
});

export default db;
