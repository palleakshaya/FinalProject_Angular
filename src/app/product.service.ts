import { Injectable } from '@angular/core';
// import { IBook } from './app.component';
// import { API } from '../../global';
export interface IBook {
  bookId: string;
  title: string;
  author: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  imageURL: string;
  stock: number;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  q!: number;
  id!: string;
  cart: Array<IBook> = [];

  // products = [
  //   {
  //     id: 1,
  //     title: 'Indriyan',
  //     author: 'Sreenath Deshagani',
  //     price: 7.05,
  //     description:
  //       'This accelerated story narrative of Ajays search for his Unknown father has a blend of reality and fantasy, with a lot of twists and turns that makes your reading a rollercoaster ride.',
  //     rating: 5,
  //     category: 'Gothic Fiction',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/71V1cA2fiZL._AC_UF1000,1000_QL80_.jpg',
  //     stock: 20,
  //   },
  //   {
  //     id: 2,
  //     title: 'The Great Gatsby',
  //     author: 'F. Scott Fitzgerald',
  //     price: 10.99,
  //     description:
  //       'A classic novel set in the Jazz Age, exploring themes of wealth, excess, and the American dream.',
  //     rating: 4.7,
  //     category: 'Fiction',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/71V1cA2fiZL._AC_UF1000,1000_QL80_.jpg',
  //     stock: 20,
  //   },
  //   {
  //     id: 3,
  //     title: '1984',
  //     author: 'George Orwell',
  //     price: 9.99,
  //     description:
  //       'A dystopian novel set in a totalitarian society under constant surveillance.',
  //     rating: 4.9,
  //     category: 'Dystopian',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/81+LDW4qePL._AC_UF1000,1000_QL80_.jpg',
  //     stock: 15,
  //   },
  //   {
  //     id: 4,
  //     title: 'To Kill a Mockingbird',
  //     author: 'Harper Lee',
  //     price: 12.99,
  //     description:
  //       'A novel about racial injustice in the Deep South, seen through the eyes of a young girl.',
  //     rating: 4.8,
  //     category: 'Fiction',
  //     imageURL:
  //       'https://rukminim2.flixcart.com/image/850/1000/xif0q/book/7/2/p/to-kill-a-mockingbird-original-imahy8w3zudfys7s.jpeg?q=20&crop=false',
  //     stock: 18,
  //   },
  //   {
  //     id: 5,
  //     title: 'The Catcher in the Rye',
  //     author: 'J.D. Salinger',
  //     price: 8.99,
  //     description: 'A story about teenage rebellion and alienation.',
  //     rating: 4.5,
  //     category: 'Fiction',
  //     imageURL:
  //       'https://rukminim2.flixcart.com/image/850/1000/kufuikw0/book/p/a/q/the-catcher-in-the-rye-original-imag7jttju9vfuxa.jpeg?q=90&crop=false',
  //     stock: 25,
  //   },
  //   {
  //     id: 6,
  //     title: 'Pride and Prejudice',
  //     author: 'Jane Austen',
  //     price: 7.99,
  //     description:
  //       'A romantic novel that critiques the British landed gentry of the early 19th century.',
  //     rating: 4.6,
  //     category: 'Romance',
  //     imageURL:
  //       'https://rukminim2.flixcart.com/image/850/1000/xif0q/book/f/e/m/pride-and-prejudice-original-imagrvgfyymy4h3n.jpeg?q=90&crop=false',
  //     stock: 30,
  //   },
  //   {
  //     id: 7,
  //     title: 'The Hobbit',
  //     author: 'J.R.R. Tolkien',
  //     price: 14.99,
  //     description:
  //       'A fantasy novel about the adventures of Bilbo Baggins in Middle-earth.',
  //     rating: 4.8,
  //     category: 'Fantasy',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/71S7Z+YhJFL._AC_UF894,1000_QL80_.jpg',
  //     stock: 12,
  //   },
  //   {
  //     id: 8,
  //     title: 'Moby Dick',
  //     author: 'Herman Melville',
  //     price: 11.99,
  //     description:
  //       'A novel about the obsessive quest of Ahab for revenge on the white whale Moby Dick.',
  //     rating: 4.4,
  //     category: 'Adventure',
  //     imageURL: 'https://m.media-amazon.com/images/I/41QJo8390EL.jpg',
  //     stock: 8,
  //   },
  //   {
  //     id: 9,
  //     title: 'War and Peace',
  //     author: 'Leo Tolstoy',
  //     price: 13.99,
  //     description:
  //       'A historical novel that intertwines the lives of multiple characters during the Napoleonic Wars.',
  //     rating: 4.7,
  //     category: 'Historical Fiction',
  //     imageURL: 'https://m.media-amazon.com/images/I/51lLr8b16DL.jpg',
  //     stock: 10,
  //   },
  //   {
  //     id: 10,
  //     title: 'The Odyssey',
  //     author: 'Homer',
  //     price: 9.99,
  //     description:
  //       'An epic poem about the adventures of Odysseus as he returns home from the Trojan War.',
  //     rating: 4.6,
  //     category: 'Classics',
  //     imageURL:
  //       'https://cdn.kobo.com/book-images/1c003baf-c48d-45be-9fd3-bc9c2bc6a685/353/569/90/False/the-odyssey-172.jpg',
  //     stock: 14,
  //   },
  //   {
  //     id: 11,
  //     title: 'The Brothers Karamazov',
  //     author: 'Fyodor Dostoevsky',
  //     price: 12.99,
  //     description:
  //       'A novel exploring deep philosophical questions about faith, morality, and free will.',
  //     rating: 4.8,
  //     category: 'Philosophical Fiction',
  //     imageURL:
  //       'https://cdn.kobo.com/book-images/c3a484bc-73d8-4412-94d0-cf36f9e21bbe/353/569/90/False/the-brothers-karamazov-7.jpg',
  //     stock: 16,
  //   },
  //   {
  //     id: 12,
  //     title: 'Jane Eyre',
  //     author: 'Charlotte Brontë',
  //     price: 8.99,
  //     description:
  //       'A novel about the life of an orphaned girl and her challenges in 19th-century England.',
  //     rating: 4.6,
  //     category: 'Gothic Fiction',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/51Xtvezf6ML._AC_UF1000,1000_QL80_.jpg',
  //     stock: 20,
  //   },
  //   {
  //     id: 13,
  //     title: 'Crime and Punishment',
  //     author: 'Fyodor Dostoevsky',
  //     price: 11.99,
  //     description:
  //       'A novel about the moral dilemmas faced by a young man after committing a murder.',
  //     rating: 4.9,
  //     category: 'Philosophical Fiction',
  //     imageURL:
  //       'https://images-na.ssl-images-amazon.com/images/I/51MSH8-1cAL.jpg',
  //     stock: 9,
  //   },
  //   {
  //     id: 14,
  //     title: 'The Divine Comedy',
  //     author: 'Dante Alighieri',
  //     price: 13.99,
  //     description:
  //       'An epic poem that describes the journey of the soul through Hell, Purgatory, and Paradise.',
  //     rating: 4.8,
  //     category: 'Classics',
  //     imageURL:
  //       'https://m.media-amazon.com/images/I/51i-9SGWr-L._AC_UF1000,1000_QL80_.jpg',
  //     stock: 7,
  //   },
  //   {
  //     id: 15,
  //     title: 'The Picture of Dorian Gray',
  //     author: 'Oscar Wilde',
  //     price: 9.99,
  //     description:
  //       'A novel about the moral degeneration of a man who remains physically youthful while his portrait ages.',
  //     rating: 4.7,
  //     category: 'Gothic Fiction',
  //     imageURL: 'https://m.media-amazon.com/images/I/41MidrEWNOL.jpg',
  //     stock: 11,
  //   },
  //   {
  //     id: 16,
  //     title: 'Love',
  //     author: 'Olivia Wilson',
  //     price: 9.72,
  //     description:
  //       'A Novel by Olivia Wilson recounts a real-life romance with emotional depth, exploring the highs and lows of true love.',
  //     rating: 4,
  //     category: 'Romance',
  //     imageURL:
  //       'https://marketplace.canva.com/EAFPpkFj4is/1/0/501w/canva-black-romance-novel-book-cover-tgFI-FdMdrY.jpg',
  //     stock: 13,
  //   },
  // ];
  getAllProducts(): Promise<IBook[]> {
    return fetch(`https://66b0acdd6a693a95b539ba20.mockapi.io/Products`).then(
      (res) => res.json()
    );
  }
  getProductsByid(bookId: string): Promise<IBook> {
    return fetch(
      `https://66b0acdd6a693a95b539ba20.mockapi.io/Products/${bookId}`
    ).then((res) => res.json());
  }
  addProductP(item: IBook) {
    // Check if the available quantity is greater than 0
    if (item.stock <= 0) {
      console.error(`Cannot add ${item.title} to cart. Out of stock.`);
      return;
    }

    const existingItem = this.cart.find((i) => item.bookId === i.bookId);
    if (existingItem) {
      existingItem.stock += 1; // Increase quantity in cart
    } else {
      this.cart.push({ ...item, stock: 1 }); // Add new item to cart
    }
  }
  removeFromCart(item: IBook) {
    const cartItem = this.cart.find((i) => i.bookId === item.bookId);
    if (cartItem) {
      cartItem.stock -= 1; // Decrease quantity in cart
      if (cartItem.stock === 0) {
        this.cart = this.cart.filter((i) => i.bookId !== item.bookId); // Remove item from cart if qty is 0
      }
    }
  }
  async updateProductQuantity(bookId: string, quantity: number): Promise<any> {
    return await fetch(
      `https://66b0acdd6a693a95b539ba20.mockapi.io/Products/${bookId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  orders: Array<IBook> = [];

  addOrder(orderDetails: any): Promise<any> {
    return this.postOrderToApi(orderDetails);
  }

  async postOrderToApi(orderDetails: any): Promise<any> {
    return await fetch('https://66b0acdd6a693a95b539ba20.mockapi.io/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((order) => {
        // Update product quantities in the API after the order is placed
        orderDetails.items.forEach((item: IBook) => {
          this.updateProductQuantity(item.bookId, item.stock - item.qty);
        });
        return order;
      });
  }

  async getOrdersP(): Promise<IBook[]> {
    return await fetch(
      'https://66b0acdd6a693a95b539ba20.mockapi.io/Orders'
    ).then((res) => res.json());
  }
}
