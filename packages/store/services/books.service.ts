import books from "./baseApi";

class BookService {
  getBooks() {
    return books.get("/books");
  }

  createBook(data: any) {
    return books.post("/books/new", data);
  }

  buyBook(data: any) {
    return books.post("/books/buy", data);
  }

  boughtBooks(addr: any) {
    return books.get("/books/purchased", addr);
  }

  getGenres(genres: string) {
    return books.get("/books/" + genres);
  }
}

export default new BookService();
