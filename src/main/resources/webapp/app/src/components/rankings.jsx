import { render } from "@testing-library/react";
import React from "react";
import {Container, Table} from "reactstrap";

export default function Rankings(props) {

    const athletesList = JSON.parse(localStorage.getItem("athletesList"));
    // const {athletesList} = props;
    return(
        <div className="padding-title">
        <h2>Bảng xếp hạng trình độ tập luyện</h2>
        <Container className="container-border">
          <Table className="table" hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên vận động viên</th>
                <th>Tổng điểm</th>
                <th>Xếp loại</th>
                <th>Xếp hạng</th>
              </tr>
            </thead>
            <tbody>
              {athletesList.map((athlete, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{athlete.name}</td>
                  <td>{athlete.totalScoresOfCriterias}</td>
                  <td>{athlete.grade}</td>
                  <td>{athlete.rank}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div> 
    );
}