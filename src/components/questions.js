import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import Pagination from 'react-bootstrap/Pagination';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { tag } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions?page=${page}&order=desc&sort=activity&tagged=${tag.replace(
          ":",
          ""
        )}&site=stackoverflow`
      )
      .then(function (response) {
        setQuestions(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page]);
  return (
    <div>
      {questions.map((question) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{question?.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Created At {question?.creation_date}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Modifyed At {question?.last_activity_date}</Card.Subtitle>
              { question?.is_answered && <Card.Link
                onClick={() => navigate(`/answare/:${question?.question_id}`)}
              >
                View Answare
              </Card.Link>}
              <Card.Link href={question?.link} target="_blank">
                Open on stack
              </Card.Link>
            </Card.Body>
          </Card>
        );
      })}
      <Pagination>
        <Pagination.Prev onClick={()=> page >1 && setPage(page-1)}/>
        <Pagination.Ellipsis />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next onClick={()=>setPage(page+1)}/>
      </Pagination>
    </div>
  );
}
