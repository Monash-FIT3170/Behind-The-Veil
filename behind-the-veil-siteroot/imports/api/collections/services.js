import {Mongo} from "meteor/mongo";

// to set up user collection
export const ServiceCollection = new Mongo.Collection("services");

export default ServiceCollection;

// write scheme here for devs (not forcefully enforced)
