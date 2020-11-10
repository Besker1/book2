// import { callbackify } from "util"

const API_URL = `https://thinkful-list-api.herokuapp.com/besker/bookmarks`

const getBookmarks = (callback) => {
    // get list of all bookmarks
    fetch(`${API_URL}`)
        .then(r=>r.json())
        .then(callback)
}

const createBookmark = (bookmark,callback) => {
    // create new bookmark with data
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(bookmark)
    }

    fetch(`${API_URL}`, options)
        .then(res => res.json())
        .then(callback)
}



// curl --location --request POST 'https://thinkful-list-api.herokuapp.com/testuser/bookmarks' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "title":"Hello",
//     "url":"https://www.hello.com"
// }'

const deleteBookmark = (id,callback) => {
    // delete bookmark with id
    const options = {
        method: "DELETE"
    }
    fetch(`${API_URL}/${id}`,options)
        .then(callback)
}

export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
}