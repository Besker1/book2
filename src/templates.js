const main_page = (store) => {
    return `<div class = container>
    <header>
                <h1>Bookmark App</h1>
                <div class="mainpage-buttons">
                    <button id="mainpage-button-newbookmark">New Bookmark</button>
                    <div class="mainpage-button-wrap">
                        <label for="mainpage-filter">Filter By</label>
                        <select id="mainpage-filter" name="mainpage-filter">
                            <option value="1" ${store.filter === 1 ? 'selected=true':''}>1</option>
                            <option value="2" ${store.filter === 2 ? 'selected=true':''}>2</option>
                            <option value="3" ${store.filter === 3 ? 'selected=true':''}>3</option>
                            <option value="4" ${store.filter === 4 ? 'selected=true':''}>4</option>
                            <option value="5" ${store.filter === 5 ? 'selected=true':''}>5</option>
                        </select>
                    </div>
                </div>
            </header>
            <section>
                <ul class="mainpage-bookmarks-list">
                    ${bookmark_list(store)}
                </ul>
            </section>
        </div>`
}

const addbookmark_page = () => {
    return `<header>
                <h1>Bookmark App</h1>
            </header>
            <form id="addbookmark-form">
                <label for="addbookmark-url">Add New Bookmark</label>
                <input type="text" id="addbookmark-url" name="addbookmark-url" placeholder="https://google.com" required/>
                <label for="addbookmark-title">New Bookmark Title</label>
                <input type="text" id="addbookmark-title" name="addbookmark-title" placeholder="The Google" required/>
                <label for="addbookmark-rating">Rating</label>
                <input type="number" min=1 max=5 id="addbookmark-rating" name="addbookmark-rating" value=3 required/>
                <label for="addbookmark-description">Description</label>
                <textarea id="addbookmark-description" name="addbookmark-description"></textarea>
                <div class = "the-buttons">
                <button class = "buttons"id="addbookmark-cancel">Cancel</button>
                <button class = "buttons" type="submit">Create Bookmark</button>
                </div>
            </form>`
}

const bookmark_list = (store) => {
    return store.bookmarks.filter(bookmark => bookmark.rating >= store.filter).map(create_bookmark).join("")
}

const create_bookmark = (bookmark) => {
    return `<li class="bookmark-item ${bookmark.expanded ? 'expanded' : ''}" id="${bookmark.id}">
                <div class="bookmark-item-title">
                    ${bookmark.title}
                </div>
                <div class="bookmark-item-rating ${bookmark.expanded ? 'expanded':''}">${bookmark.rating}</div>
                <div class="bookmark-item-button">
                    <button class="bookmark-item-button-delete">DELETE</button>  
                </div>
                <div class="bookmark-item-content-wrapper ${bookmark.expanded ? 'expanded':''}">
                    <div class="bookmark-item-rating">Rating: ${bookmark.rating}</div>
                    <div class="bookmark-item-link">
                        <a href="${bookmark.url}">Visit Site</a>
                    </div>
                    <div class="bookmark-item-description">
                        Description: ${bookmark.desc}
                    </div>
                </div>
            </li>`
}

export default {
    main_page,
    addbookmark_page,
    create_bookmark
}