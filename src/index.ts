import ArrivalLog from "./dto/ArrivalLog";
import Captain from "./dto/Captain";
import Vessel from "./dto/Vessel";
import Port from "./dto/Port";
import CaptainService from "./CaptainService";
import ArrivalLogService from "./ArrivalLogService";
import {GraphQLScalarType} from "graphql";
import { Kind } from 'graphql/language';

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  
  type Captain {
    name: String
    vessel: Vessel
    arrivalLogs: [ArrivalLog]
  }

  type Vessel {
    name: String
    captain: Vessel
  }
  
  type Port {
    name: String,
    vessels: [Vessel]
  }
  
  type ArrivalLog {
    captain: Captain
    vessel: Vessel
    port: Port
    timestamp: Date
  }

  type Query {
    captains(captainName: String): [Captain]
  }
  
  type Mutation {
    logVisit(captainName: String, vesselName: String, portName: String): ArrivalLog
  }
  
`;

const arrivalLogService = new ArrivalLogService();
const captainService = new CaptainService();

const resolvers = {
  Query: {
    captains: (parent, args) => {
      console.log('querying', parent);
      return captainService.list(args.captainName);
    }
  },
  Mutation: {
    logVisit: (parent, args) => {
      const captain = new Captain(args.captainName);
      captainService.save(captain);
      const arrivalLog = new ArrivalLog(
        captain,
        new Vessel(args.vesselName),
        new Port(args.portName));
      arrivalLogService.save(arrivalLog);
      console.log('logging visit', arrivalLog);
      return arrivalLog
    }
  },
  Captain: {
    arrivalLogs: (captain) => {
      const arrivalLogs = arrivalLogService.list(captain.name);
      return arrivalLogs;
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});