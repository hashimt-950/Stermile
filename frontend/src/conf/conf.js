const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    watchlistCollectionID: String(import.meta.env.VITE_APPWRITE_WATCHLIST_COLLECTION_ID)
}


export default conf