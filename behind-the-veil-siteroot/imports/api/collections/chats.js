/**
 * File Description: Chats database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import {Mongo} from "meteor/mongo";

// set up chat collection
export const ChatCollection = new Mongo.Collection("chats");

export default ChatCollection;