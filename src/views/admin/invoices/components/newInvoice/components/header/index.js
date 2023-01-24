import React from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';

const HeaderInvoiceForm = () => {
    return (
        <Form>
            <Row>
                <Col md="2">
                    <FormGroup>
                        <Label>Fecha</Label>
                        <Input type="date" />
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <Label>Punto de Venta</Label>
                        <Input type="select">

                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>T. Factura</Label>
                        <Input type="select">

                        </Input>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <Label>Nº de Comprobante</Label>
                        <Input type="text" disabled />
                    </FormGroup>
                </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <Col md="12">
                    <Label>Cliente</Label>
                    <InputGroup>
                        <Input
                            type="text"
                            id="razSocTxt"
                            disabled
                            required
                        />
                        < InputGroupAddon addonType="append">
                            <Button className="btn btn-info" onClick={(e) => {
                                e.preventDefault();
                            }} >
                                <i className="fas fa-search" ></i>
                            </Button>
                        </InputGroupAddon>
                    </ InputGroup>
                </Col>
            </Row>
            <Row style={{ marginTop: "25px" }}>
                <Col md="4">
                    <FormGroup>
                        <Label>Forma de Pago</Label>
                        <Input type="select" id="factFiscTxt" >
                            <option value={0}>Efectivo</option>
                            <option value={1}>Mercado Pago</option>
                            <option value={2}>Débito</option>
                            <option value={3}>Crédito</option>
                            <option value={5}>Varios Métodos</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="3" >
                    <Label for="factFiscTxt">Envíar Factura por Email</Label>
                    <Input type="select" >
                        <option value={0}>No</option>
                        <option value={1}>Si</option>
                    </Input>
                </Col>
                <Col md="5">
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default HeaderInvoiceForm