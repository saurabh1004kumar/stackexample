import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useParams } from 'react-router';

export default function Answares() {
  const [answares, setAnswares] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/questions/${id.replace(':','')}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`
      )
      .then(function (response) {
        setAnswares(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [0]);
  return (
    <div>
      {answares.length>0 ? (answares.map((answare) => {
        return (
                answare.body
        )
      })) : 'No Answare Found'}
    </div>
  )
}
