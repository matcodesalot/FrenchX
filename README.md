# FrenchX

## Functional Specification

### Overview

The product will provide a spaced repetition algorithm that aid in learning French in a very effective manner.

Disclaimer: This project is mainly built for learning purposes and not intended for production use.

### Scenarios

#### Scenario 1:

Lavie's parents immigrated from France but she was born and raised in New York. Because of this, Lavie is horrible at French. Lavie has tried to learn French but it never seems to stick. Lavie decides to build a product with her teammates Mat and Beatrix to learn French more effectively. After working with it, she finds that the information is sticking a lot better.

### Non-Goals

This version will not support the following features:

- Multiple language support
- Sharing between Accounts

### Functionality

#### Frontend

The frontend for the app will be built using React and Redux, and allow users to login, answer the questions, and see how many questions they have successfully answered. To answer a question the user will be shown a word in the language they are trying to learn on the left-hand side of the screen, and asked to type the corresponding word in their native language on the right-hand side. When they submit the they will be given feedback on whether they were correct, and taken to the next question.

The frontend will need to submit information stating whether the question was answer correctly or not to the backend so that the spaced repetition algorithm can take that into account.

To authenticate, you are going to be using Google's implementation of OAuth. This will allow anyone with a Google account to simply and easily register or login to your app. On the frontend this makes your requirements very simple: you simply need a login button which links to the appropriate backend endpoint, and a combination of Google and your backend will take care of the rest.

##### Requirements

- Technologies: React, Redux
- Two pages: Landing page and spaced repetition page
- Landing page:
  - Advertise the app
  - Register/login with Google button
- Spaced repetition page:
  - Displays current word
  - Text input for answer
  - Notifies the user whether they were correct or incorrect
  - Submits correct/incorrect to backend

#### Backend

The backend of the app plays three key roles. The first is authentication. To allow users to authenticate, the backend should use the Google OAuth 2.0 strategy for Passport.

The second role is to integrate the spaced repetition algorithm into your app. It should have an endpoint for the frontend to fetch the next question from, and an endpoint for the frontend to record what the user's response was.

The third role is to store the users' progress in a MongoDB database. This should include both the number of questions which they have answered correctly, plus any information about their answer history that your spaced repetition algorithm needs in order to generate a new sequence of words to test the user.

##### Requirements

- Technologies: Node.js, Express, MongoDB, Passport, OAuth
- Allow users to register/login using Google OAuth
- Use the spaced repetition algorithm to generate the next word pair
- Pairs of words should be stored in a Mongo database
  - This should be a fixed array of questions for an MVP
- Store the number of questions which users have answered correctly in the database
- Store whatever information is needed for the algorithm about the user's answer history in the database

#### Wireframe

- [Splash Page](https://wireframe.cc/PAFKuo)
- [Main App](https://wireframe.cc/7jKL60)
=======
![Screenshot](client/assets/img/frenchx.png)
![Screenshot](client/assets/img/application.png)

## A little bit about French X

French X was developed to help students who are learning french. We used the spaced repetition algorithm to ensure the most suitable learning environment for everyone. The algorithm is fairly simple: if the user answers the question correctly, that question will move back 2 spaces concurrently in the list. If the user answers the question incorrectly, that question will move back only 1 space in the list. In layman's terms, questions answered incorrectly will show up more often than questions answered correctly.

## How to use this app

* Registering for French X is easy. Simply click `sign in with google`, enter your gmail log in credentials, and wam bam, you're learning French.
* Once you're logged in, you must translate what the French vocabulary word is to English.
* When you have your French word translated, type your answer in the `English` input field (I'm sure you got it right. You're a smart little cookie.)
* If you answered the question correctly, congratulations! Your score will increase by 10 and you'll feel good about yourself.
* If you answered the question incorrectly, that's okay! The algorithm will set that question to come up again really soon so you may try again.
* Once you've mastered the French language, press the logout button to successfully sign out of French X.

## API Documentation

* /auth/google: used to log into the application using the google oauth system
* /questions/`accessToken`: GET the questions returning information that specifically pertains to the user tied to that access token
* /questions/`accessToken`: POST the weight of each question to the database as the user correctly or incorrectly answers the question

## Technical

The frontend of this web application is developed using React and Redux. The backend uses Node.js and Mongo to store information the database. French X uses the Google OAuth 2.0 system. This is used to easily log users in using their gmail credentials and store their session in the database. There are 10 total questions stored in the database. Each question has a weight attached to them that decides how many places in the array it will be sent back. For example if a question has a weight of 4, that question will be sent back 4 places. As you answer the next 4 questions, you will see that same question again.

# Go forth and learn!
