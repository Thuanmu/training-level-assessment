import React, { useState } from "react";
import { render } from "@testing-library/react";
import { Button, Container, Form, Input, Label } from "reactstrap";

import Criteria from './criteria';

export default function AthleteClassification(props) {

    const [isHide, setIsHide] = useState(false);
    const [athletesCount, setAthletesCount] = useState('');

    if (isHide) {
      return null;
    }

    const handleAthletesCount = event => setAthletesCount(event.target.value);

    const handleNext = () => {
        localStorage.setItem("athletesCount", JSON.stringify(athletesCount));
        setIsHide(true);
        render(<Criteria athletesCount={athletesCount}/>);
    }
    
    return (
      <div className="padding-title">
        <h2>Phân loại trình độ tập luyện của các VĐV chạy 100m cấp cao</h2>
        &nbsp;
          <Form className="athlete-count">
            <Label>Số vận động viên</Label>
            <Input type="text" name="athletes-count" value={athletesCount} onChange={handleAthletesCount} />
            <Button id="btn-next" color="info" size="sm" onClick={handleNext} >Tiếp theo</Button>
          </Form>
      </div>
    );
}

