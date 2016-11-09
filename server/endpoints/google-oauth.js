import 'babel-polyfill';
import express from 'express';
import path from 'path'; //?
import passport from 'passport';
import secrets from '../secrets';
import User from '../schemas/user';
const GoogleStrategy = require('passport-google-oauth20').Strategy;