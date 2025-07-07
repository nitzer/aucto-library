import { Link } from "react-router";

const AuthorCard = ({author}) => {
    return (
        <div className="max-w-sm overflow-hidden">
            <Link className="font-bold text-md mb-2" to={`authors/${author._id}`}>
                {author.firstName} {author.lastName}
            </Link>
        </div>
    );
}

export default AuthorCard;

