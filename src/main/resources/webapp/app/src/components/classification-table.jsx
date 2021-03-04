import React from "react";
import {Container, Table} from "reactstrap";

export default function ClassificationTable(props) {
    
    const {newAthletesList} = props;
    return (
      <div className="padding-title-title">
        <h2>Kết quả phân loại trình độ tập luyện</h2>
        <Container className="container-border">
          <Table className="table" hover>
            <thead>
              <tr>
                <>Tên vận động viên</>
                <th>Tổng điểm</th>
                <th>Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {newAthletesList.map((athlete, i) => (
                <tr>
                  <td>{athlete.name}</td>
                  <td>{athlete.totalScoresOfCriterias}</td>
                  <td>{athlete.grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );

}