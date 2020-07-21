import {mongoose} from 'mongoose';
import { loadFilesSync, mergeResolvers } from 'graphql-tools';

const resolversArray = loadFilesSync('./data/resolvers');

const resolvers = mergeResolvers(resolversArray);

export default resolvers;