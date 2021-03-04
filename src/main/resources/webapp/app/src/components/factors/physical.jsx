import { render } from "@testing-library/react";
import React from "react";
import {Container, Table} from "reactstrap";

export default function Physical(props) {

    const athletesList = JSON.parse(localStorage.getItem("athletesList"));

    // const {athletesList} = props;
    return(
        <div className="padding-title">
        <h2>Yếu tố thể lực</h2>
        <Container className="container-border">
          <Table className="table" responsive hover>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên vận động viên</th>
                <th>Thời gian phản xạ xuất phát (s)</th>
                <th>Chạy 30m tốc độ cao (s)</th>
                <th>Chạy 30m xuất phát thấp (s)</th>
                <th>Chạy 60m xuất phát thấp (s)</th>
                <th>Chạy 80m xuất phát cao (s)</th>
                <th>Chạy 150m xuất phát cao (s)</th>
                <th>Bật xa tại chỗ (m)</th>
                <th>Bật 3 bước tại chỗ (m)</th>
                <th>Bật 10 bước tại chỗ (m)</th>
                <th>Thời gian chạy 20m cuối trong chạy 100m (s)</th>
                <th>Hệ số sức bền K (s)</th>
                <th>Nâng cao đùi tại chỗ 10s (lần)</th>
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              {athletesList.map((athlete, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{athlete.name}</td>
                  <td>{athlete.criteriasList[0]}</td>
                  <td>{athlete.criteriasList[1]}</td>
                  <td>{athlete.criteriasList[2]}</td>
                  <td>{athlete.criteriasList[3]}</td>
                  <td>{athlete.criteriasList[4]}</td>
                  <td>{athlete.criteriasList[5]}</td>
                  <td>{athlete.criteriasList[6]}</td>
                  <td>{athlete.criteriasList[7]}</td>
                  <td>{athlete.criteriasList[8]}</td>
                  <td>{athlete.criteriasList[9]}</td>
                  <td>{athlete.criteriasList[10]}</td>
                  <td>{athlete.criteriasList[11]}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div> 
    );
}