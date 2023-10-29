import { Client, Databases, Account } from "appwrite";

const client = new Client();

export const PROJECT_ID = "64fb0495e24894a8acbc";
export const DATABASE_ID = "64fd73bc3a82329a71d9";
export const COLLATION_ID_MESSAGES = "64fd73e1dc93aa276d49";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64fb0495e24894a8acbc");

export const databases = new Databases(client);

export const account = new Account(client);

export default client;
