import React from 'react';
import { Button, CardBody, CardFooter, CardHeader, Col, Label, Row } from 'reactstrap';

const ClientsList = ({
    setNewForm,
    setIdClient,
    idClient
}) => {
    return (<>
        <CardHeader>
            <Row>
                <Col>
                    <Label>Listado de Clientes</Label>
                </Col>
            </Row>
        </CardHeader>
        <CardBody>

        </CardBody>
        <CardFooter>
            <Row>
                <Col>
                    <Button
                        onClick={e => {
                            e.preventDefault()
                            setIdClient(false)
                            setNewForm(true)
                        }}
                        color="primary">Nuevo Cliente</Button>
                </Col>
            </Row>
        </CardFooter>
    </>)
}

export default ClientsList