import { render } from "@testing-library/react";
import React from "react";
import {Container, Table} from "reactstrap";

export default function Form(props) {

    const athletesList = JSON.parse(localStorage.getItem("athletesList"));
    // const {athletesList} = props;
    return(
        <div className="padding-title">
        <h2>Yếu tố hình thái</h2>
        <Container className="container-border">
          <Table className="table" hover>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên vận động viên</th>
                <th>Chỉ số Quetelet (g/cm)</th>
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              {athletesList.map((athlete, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{athlete.name}</td>
                  <td>{athlete.criteriasList[17]}</td>
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