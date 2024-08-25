import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

function BlogCard({ id, img, title, description, blogDelete }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-end align-items-center gap-2">
          <Link to={`/blogaction/${id}`}>
            <CiEdit />
          </Link>
          <AiOutlineDelete
            className="text-danger"
            onClick={() => blogDelete(id)}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
