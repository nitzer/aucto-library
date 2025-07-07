import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateBookDto } from './dto/create-book.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export default class BooksGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  /**
   * Used to emit a message when a book is created.
   * @param book The book that was created
   */
  emitNewBook(book: CreateBookDto) {
    console.log(book);
    this.server.emit('books/new', {
      message: `A new book from `,
      book: book,
    });
  }
}
