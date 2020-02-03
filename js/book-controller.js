'use strict';

function onInit() {
    renderBooks()
}


function renderBooks() {
    // debugger
    var books = getBooksForDisplay()
    var strHTMLs = books.map(function (book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td> 
        <button onclick="onShowBookDetails(event,${book.id})">Read</button>
         </td>
        <td> 
        <button onclick="onDisplayInput(event,${book.id})">Update</button>
         </td>
        <td> 
        <button onclick="onRemoveBook(event,${book.id})">Delete</button>
         </td>
        </tr>`
    });
    var elTable = document.querySelector('.books-table')
    elTable.innerHTML = strHTMLs.join('');
}

function onRemoveBook(event, bookId) {
    event.stopPropagation();
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var elBookName = document.querySelector('.book-name')
    var name = elBookName.value
    var elBookPrice = document.querySelector('.book-price')
    var price = elBookPrice.value
    var elBookImg = document.querySelector('.book-img')
    var img = elBookImg.value
    addBook(name, price, img)
    elBookName.value = ''
    elBookPrice.value = ''
    elBookImg.value = ''
    renderBooks()
}

function onDisplayInput(event, bookId) {    // display the Update form and send the current book id to the service
    event.stopPropagation()
    document.querySelector('.update-container').hidden = false
    setCurrId(bookId)
}


function onUpdateBook() {
    var elBookName = document.querySelector('.update-name')
    var name = elBookName.value
    var elBookPrice = document.querySelector('.update-price')
    var price = elBookPrice.value
    var elBookImg = document.querySelector('.update-img')
    var img = elBookImg.value
    updateBook(name, price, img)
    document.querySelector('.update-container').hidden = true
    renderBooks()
}


function onShowBookDetails(event, bookId) {
    event.stopPropagation()
    setCurrId(bookId)
    var book = getBook();
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = 'Title: ' + book.name;
    elModal.querySelector('h4').innerText = 'Price: ' + book.price + '$'
    elModal.querySelector('.rating').innerText = book.rate
    var img = document.querySelector('.modal img')
    img.src = `${book.imgUrl}`;

    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onChangeRate(diff) {
    var book = getBook()
    changeRate(diff)
    document.querySelector('.rating').innerText = book.rate
}

function onSortChange(sortBy) {

    setSortBy(sortBy)
    if (sortBy === 'Title') sortBooksByName()
    if (sortBy === 'Price') sortBooksByPrice()
    renderBooks()
}

function onChangePage(diff) {
    changePage(diff)
    renderBooks();
}

