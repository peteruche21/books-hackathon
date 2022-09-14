import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import books from "./baseApi";

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyRjFhNDA3MzczNTc4ZTRmOThiRTNmQTEwZTY3MWUzMmY2NzI0NUUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjkxNDkyMzM3OCwibmFtZSI6ImJvb2tzIn0.ep4TTBS4MH5eQKak9ea4wzarrZyq1xTNHsHBs2MtGaw",
});

class BookService {
  metadata: any;
  getBooks() {
    return books.get("/books");
  }

  async createBook(data: any) {
    let { name, type } = data.bookpdf;
    console.log("ebaaa1");
    const metadata = await client.store({
      name: data.title,
      description: data.description,
      image: new File([data.bookpdf], name, { type }),
      properties: {
        user: data.user,
        file: new File([data.bookcover], data.bookcover.name, {
          type: data.bookcover.type,
        }),
        genre: data.genre,
        price: data.price,
      },
    });
    this.metadata = metadata;
    console.log("ebaaa2");
    console.log(metadata.url);
    if (metadata.data) return metadata.data;
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
