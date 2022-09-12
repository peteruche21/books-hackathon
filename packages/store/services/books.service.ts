import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import books from "./baseApi";

class BookService {
  client: any;
  constructor() {
    this.client = new NFTStorage({ token: process.env.NFT_APIKEY });
  }
  getBooks() {
    return books.get("/books");
  }

  async createBook(data: any) {
    let { name, type } = data.bookpdf;

    const metadata = await this.client.store({
      name: data.title,
      description: data.description,
      image: new File(data.bookpdf, name, type),
      properties: {
        user: data.user,
        file: new File(
          data.bookcover,
          data.bookcover.name,
          data.bookcover.type
        ),
        genre: data.genre,
        price: data.price,
      },
    });
    if (metadata) return metadata;
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
