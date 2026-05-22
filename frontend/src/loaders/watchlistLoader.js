import authService from "../appwrite/auth"
import watchlistService from "../appwrite/database"

const getWatchlist = async () => {
        const user = await authService.GetCurrentUser()
        const res = await watchlistService.getWatchList(user.$id)
        return res.documents
}


export default getWatchlist