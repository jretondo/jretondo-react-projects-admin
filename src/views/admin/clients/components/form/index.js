import API_ROUTES from '../../../../../api/routes';
import React, { useContext, useState } from 'react';
import { Button, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, InputGroupButtonDropdown, Label, Row, Spinner } from 'reactstrap';
import AlertsContext from '../../../../../context/alerts';
import ActionsBackend from '../../../../../context/actionsBackend';

const ClientForm = ({
    setNewForm,
    idClient
}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [documentTypeStr, setDocumentTypeStr] = useState("CUIT")
    const [documentType, setDocumentType] = useState(80)
    const [documentNumber, setDocumentNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [fantasieName, setFantasieName] = useState("")
    const [email, setEmail] = useState("")
    const [ivaCondition, setIvaCondition] = useState(6)
    const [loading, setLoading] = useState(false)

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGet, axiosPost } = useContext(ActionsBackend)

    const resetForm = (e) => {
        e && e.preventDefault()
        setDocumentNumber("")
        setDocumentType(80)
        setDocumentTypeStr("CUIT")
        setBusinessName("")
        setFantasieName("")
        setEmail("")
        setIvaCondition(6)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const client = {
            document_type: documentType,
            document_number: documentNumber,
            business_name: businessName,
            fantasie_name: fantasieName,
            email: email,
            iva_condition_id: ivaCondition
        }
        idClient && (client.id = idClient)

        const response = await axiosPost(API_ROUTES.clientsDir.clients, client)

        if (!response.error) {
            resetForm()
            if (idClient) {
                newActivity(`Se ha modificado al cliente ${businessName} CUIT/DNI: ${documentNumber}`)
                newAlert("success", "Cliente modificado con éxito!", "")
                setNewForm(false)
            } else {
                newActivity(`Se ha creado al cliente ${businessName} CUIT/DNI: ${documentNumber}`)
                newAlert("success", "Cliente agregado con éxito!", "")
            }
        } else {
            newAlert("danger", "Hubo un error!", "Revise que el documento del cliente no esté repetido. Error: " + response.errorMsg)
        }
        setLoading(false)
    }

    return (
        <>
            <CardHeader>
                <Row>
                    <Col md="3">{idClient ? "Modificar Cliente" : "Nuevo Cliente"}</Col>
                    <Col md="6"></Col>
                    <Col md="3" style={{ textAlign: "right" }}>
                        <Button
                            color="danger"
                            style={{ with: "50px" }}
                            onClick={e => {
                                e.preventDefault()
                                setNewForm(false)
                            }}
                        >X</Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form onSubmit={onSubmit}>
                    {
                        loading ?
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Spinner style={{ width: "200px", height: "200px" }} />
                                </Col>
                            </Row>
                            :
                            <>
                                <Row>
                                    <Col md="3">
                                        <FormGroup>
                                            <Label>Documento</Label>
                                            <InputGroup>
                                                <InputGroupButtonDropdown addonType="prepend" isOpen={isOpenDropdown} toggle={() => setIsOpenDropdown(!isOpenDropdown)}>
                                                    <DropdownToggle color="primary" split style={{ paddingInLine: "30px" }}> {documentTypeStr} </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => {
                                                            setDocumentTypeStr("CUIT")
                                                            setDocumentType(80)
                                                        }} >CUIT</DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => {
                                                                setDocumentTypeStr("DNI")
                                                                setDocumentType(96)
                                                            }}
                                                        >DNI</DropdownItem>
                                                    </DropdownMenu>
                                                </InputGroupButtonDropdown>
                                                <Input
                                                    type="text"
                                                    style={{ paddingLeft: "10px" }}
                                                    placeholder={documentTypeStr + "..."}
                                                    value={documentNumber}
                                                    onChange={e => {
                                                        setDocumentNumber(e.target.value)
                                                    }}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Label>Razón Social</Label>
                                            <Input
                                                type="text"
                                                placeholder="Razón social..."
                                                value={businessName}
                                                onChange={e => {
                                                    setBusinessName(e.target.value)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>Cond. IVA</Label>
                                            <Input
                                                type="select"
                                                value={ivaCondition}
                                                onChange={e => {
                                                    setIvaCondition(e.target.value)
                                                }}
                                            >
                                                <option value={6}>Monotributista</option>
                                                <option value={1}>Res. Inscripto</option>
                                                <option value={4}>Res. Exento</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2"></Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Nombre de Fantasía</Label>
                                            <Input
                                                type="text"
                                                placeholder="Nombre de fantasia..."
                                                value={fantasieName}
                                                onChange={e => {
                                                    setFantasieName(e.target.value)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input
                                                type="email"
                                                placeholder="Email..."
                                                value={email}
                                                onChange={e => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2"></Col>
                                </Row>
                                <Row>
                                    <Col md="12" style={{ textAlign: "center" }}>
                                        <Button
                                            style={{ minWidth: "150px" }}
                                            color="success"
                                            type="submit"
                                        >Agregar</Button>
                                        <Button
                                            style={{ minWidth: "150px" }}
                                            color="danger"
                                            onClick={resetForm}
                                        >Cancelar</Button>
                                    </Col>
                                </Row>
                            </>
                    }
                </Form>
            </CardBody>
        </>
    )
}

export default ClientForm