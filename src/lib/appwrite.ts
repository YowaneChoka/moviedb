import { Client, Databases, Storage, Account, Query } from 'appwrite';
import { DATABASE_ID } from './appwrite-services';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id');

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1')
//   .setProject(PROJECT_ID)

export const updateSearchCount = async (searchTerm: string, movie: any) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    // const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    //   Query.equal('searchTerm', searchTerm),
    // ])

    // // 2. If it does, update the count
    // if (result.documents.length > 0) {
    //   const doc = result.documents[0];

    //   await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
    //     count: doc.count + 1,
    //   })
    //   // 3. If it doesn't, create a new document with the search term and count as 1
    // } else {
    //   await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    //     searchTerm,
    //     count: 1,
    //     movie_id: movie.id,
    //     poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //   })
    // }
  } catch (error) {
    console.error(error);
  }
}

export const getTrendingMovies = async () => {
  try {
    // const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    //   Query.limit(5),
    //   Query.orderDesc("count")
    // ])

    // return result.documents;
  } catch (error) {
    console.error(error);
  }
}

export { client, account, database, storage };