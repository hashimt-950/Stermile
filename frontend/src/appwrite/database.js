import conf from "../conf/conf";
import { Client, Databases, ID, Permission, Role, Query } from "appwrite";

export class WatchListService{
    client = new Client();
    database;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        this.database = new Databases(this.client)
    }

    async addToWatchlist(userId, movie) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabseID,
                conf.watchlistCollectionID,
                ID.unique(),
                {
                    userId,
                    overview:String(movie.overview),
                    movieId: String(movie.id),
                    title: String(movie.title),
                    posterpath:String(movie.poster_path),
                    createdAt: new Date().toISOString(),
                }

            )
        } catch (error) {
            throw error
        }
    }

    async getWatchList(userId){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabseID,
                conf.watchlistCollectionID,
                [Query.equal('userId', userId)]

            )
        } catch (error) {
            throw error
        }
    }


    async removeFromWatchlist(docId){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabseID,
                conf.watchlistCollectionID,
                docId
            )
            
        } catch (error) {
            throw error
        }
    }

}

const watchlistService = new WatchListService()
export default watchlistService