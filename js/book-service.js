'use strict';
var KEY = 'Books';
var gBooks = _createBooks()
var gCurrId; 
var gSortBy = 'Title'
var gCurrPage = 1;
const BOOKS_IN_PAGE = 3;

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    var to = from + BOOKS_IN_PAGE;
    return gBooks.slice(from, to);
}
function getBook() { // returns a book according to the gCurrId
    return gBooks.find(book => book.id === gCurrId)
}


function setCurrId(bookId) {
    gCurrId = bookId
}

function addBook(name, price, imgUrl) {
    var book = _createBook(name, price, imgUrl)
    gBooks.unshift(book)
    saveToStorage(KEY, gBooks)
}

function updateBook(name, price, img) {
    var idx = gBooks.findIndex(book => book.id === gCurrId)
    if (name) gBooks[idx].name = name
    if (price) gBooks[idx].price = price
    if (img) gBooks[idx].imgUrl = img

    saveToStorage(KEY, gBooks)
}
function removeBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    saveToStorage(KEY, gBooks)
}



function changeRate(diff) {

    var book = getBook()
    if (diff === 1 && book.rate === 10) return
    if (diff === -1 && book.rate === 0) return
    book.rate += diff

    saveToStorage(KEY, gBooks)
}


function _createBooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = [
        _createBook('Watchman', 65, 'https://tinyurl.com/rjow2w6'),
        _createBook('Deadpool', 75, 'https://tinyurl.com/sfpaow8'),
        _createBook('The Hobbit', 45, 'https://tinyurl.com/vxrxmka'),
        _createBook('An Ipsum Tale', 50, 'https://tinyurl.com/ts3qqty')
    ]

    return books;
}

function _createBook(name, price, imgUrl) {
    return {
        id: parseInt(Math.random() * 1000),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    }
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}

function sortBooksByName() {
    gBooks.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
    return gBooks
}

function sortBooksByPrice() {

    gBooks.sort(function (a, b) {
        return a.price - b.price
    });
    return gBooks

}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;

}