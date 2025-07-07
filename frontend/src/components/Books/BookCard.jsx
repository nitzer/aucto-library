import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <div className="group block bookCard border border-stone-200 rounded-sm p-4">
      <img
        src={`https://picsum.photos/150/200?random?random=${book._id}`}
        alt={book.title}
        className="w-full object-cover"
      />
      <div className="mt-3 flex justify-between text-sm">
        <div>
          <Link to={`/books/${book._id}`} className="text-gray-900 group-hover:underline group-hover:underline-offset-4 overflow-hidden">
            {book.title}
          </Link>

          <p className="mt-1.5 text-xs text-pretty text-gray-500 overflow-hidden">
           By {book.author.firstName} {book.author.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
