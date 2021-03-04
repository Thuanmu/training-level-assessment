import React from "react";
import { Col, Row } from "reactstrap";


export default function Footer(props) {
    return(
     <div className="footer">
        &nbsp;
        <Row>
            <Col md="2">TrainingLevel © 2021.</Col>
            <Col md="8"></Col>
            <Col md="2">
                <p>
                    Powered by
                    &nbsp;
                    <a href={"https://www.facebook.com/thuanmu"}>ThuanPV</a>
                </p>
            </Col>
        </Row>
     </div>
    );
}