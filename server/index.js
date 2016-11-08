import 'babel-polyfill';
import express from 'express';

import mongoose from 'mongoose';
import User from './schemas/user';
import usersRoutes from './endpoints/users-routes';
import questionsRoutes from './endpoints/questions-routes';

mongoose.Promise = global.Promise;


const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
exports.app = app;

app.use('/users', usersRoutes);
app.use('/questions', questionsRoutes);

app.use(express.static(process.env.CLIENT_PATH));

function runServer() {
    return new Promise((resolve, reject) => {
        let databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/lefrench';
        mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');

            app.listen(PORT, HOST, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                const host = HOST || 'localhost';
                console.log(`Listening on ${host}:${PORT}`);
            });
        });
    });
}

if (require.main === module) {
    runServer();
}
