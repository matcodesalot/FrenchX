import 'babel-polyfill';
import express from 'express';

import mongoose from 'mongoose';
import User from './schemas/user';
import Question from './schemas/question';
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

app.get('/', function(req, res) { res.sendFile('index.html'); });

function seedData() {
    let questions = [
        {
            question: "Bonjour",
            answer: "Hello",
        },
        {
            question: "Au revoir",
            answer: "Goodbye",
        },
        {
            question: "Je suis",
            answer: "I am",
        },
        {
            question: "fromage",
            answer: "cheese",
        },
        {
            question: "visage",
            answer: "face",
        },
        {
            question: "entrepreneur",
            answer: "businessman",
        },
        {
            question: "je ne sais quoi",
            answer: "special something",
        },
        {
            question: "meurtre",
            answer: "murder",
        },
        {
            question: "chein",
            answer: "dog",
        },
        {
            question: "femme",
            answer: "woman",
        }
    ];

    for (var i = 0; i < questions.length; i++) {
        Question.create(questions[i]);
    }
}

function runServer() {
    return new Promise((resolve, reject) => {
        let databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/lefrench';
        mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');

            Question.find({}, function(err, questions) {
                if(err) {
                    console.error(err);
                }
                if(questions.length === 0) {
                    seedData();
                }
            });

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
