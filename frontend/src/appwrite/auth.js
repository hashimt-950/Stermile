import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client= new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async SignUp({email, password, name}){
        try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name)
           if(userAccount){
            return this.LoginIn({email, password})
           }
           else{
                return userAccount
           }
        } catch (error) {
            throw error
        }
    }


    async LoginIn({email, password}) {
        try {
          return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async GetCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null
    }
    

    async LogOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()


export default authService