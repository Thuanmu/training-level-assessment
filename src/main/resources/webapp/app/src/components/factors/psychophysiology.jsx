import { render } from "@testing-library/react";
import React from "react";
import {Container, Table} from "reactstrap";

export default function Psychophysiology(props) {

    const athletesList = JSON.parse(localStorage.getItem("athletesList"));
    // const {athletesList} = props;
    return(
        <div className="padding-title">
        <h2>Yếu tố tâm-sinh lý</h2>
        <Container className="container-border">
          <Table className="table" hover>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên vận động viên</th>
                <th>Phản xạ đơn (s)</th>
                <th>Chỉ số dung tích sống (ml/kg)</th>
                <th>Tần số tim hồi phục 30s sau chạy 100m (lần/ph)</th>
                <th>Hàm lượng LA sau chạy 100m (mmol/lít)</th>
                <th>Ngày tạo</th>
                <th>Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              {athletesList.map((athlete, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{athlete.name}</td>
                  <td>{athlete.criteriasList[13]}</td>
                  <td>{athlete.criteriasList[14]}</td>
                  <td>{athlete.criteriasList[15]}</td>
                  <td>{athlete.criteriasList[16]}</td>
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