import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/tags?page=${page}&order=desc&sort=popular&site=stackoverflow`
      )
      .then(function (response) {
        setTags(response.data.items);
      })
      .catch(function (error) {});
  }, [page]);
  return (
    <div>
      {tags.map((tag) => {
        return (
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              onClick={() => navigate(`/questions/:${tag?.name}`)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tag.name}</div>
              </div>
              <Badge bg="primary" pill>
                {tag.count}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
      <Pagination>
        <Pagination.Prev
          onClick={() => page>1 && setPage(page - 1)}
        />
        <Pagination.Ellipsis />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
    </div>
  );
}
