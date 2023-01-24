import API_ROUTES from '../../../../../api/routes';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, InputGroupButtonDropdown, Label, Row, Spinner } from 'reactstrap';
import AlertsContext from '../../../../../context/alerts';
import ActionsBackend from '../../../../../context/actionsBackend';
import { verifyCuit } from 'function/verifyCuit';
import { verifyDni } from 'function/verifyDni';

const ClientForm = ({
    setNewForm,
    idClient
}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [documentTypeStr, setDocumentTypeStr] = useState(idClient ? idClient.document_type === 80 ? "CUIT" : "DNI" : "CUIT")
    const [documentType, setDocumentType] = useState(idClient ? idClient.document_type : 80)
    const [documentNumber, setDocumentNumber] = useState(idClient ? idClient.document_number : "")
    const [businessName, setBusinessName] = useState(idClient ? idClient.business_name : "")
    const [fantasieName, setFantasieName] = useState(idClient ? idClient.fantasie_name : "")
    const [email, setEmail] = useState(idClient ? idClient.email : "")
    const [ivaCondition, setIvaCondition] = useState(idClient ? idClient.IvaConditions[0].description : 6)
    const [loading, setLoading] = useState(false)
    const [isValidDocument, setIsValidDocument] = useState(null)

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosPost } = useContext(ActionsBackend)

    const resetForm = (e) => {
        e && e.preventDefault()
        setDocumentNumber("")
        setDocumentType(80)
        setDocumentTypeStr("CUIT")
        setBusinessName("")
        setFantasieName("")
        setEmail("")
        setIvaCondition(6)
        document.getElementById("document-number").select()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isValidDocument) {

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
        } else {
            newAlert("danger", "Hubo un error!", "El número de " + documentTypeStr + " es inválido!")
            document.getElementById("document-number").select()
        }
    }

    useEffect(() => {
        document.getElementById("document-number").select()
    }, [])

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
                                                    required
                                                    invalid={isValidDocument === null ? false : !isValidDocument}
                                                    valid={isValidDocument === null ? false : isValidDocument}
                                                    id="document-number"
                                                    type="text"
                                                    style={{ paddingLeft: "10px" }}
                                                    placeholder={documentTypeStr + "..."}
                                                    value={documentNumber}
                                                    onChange={e => {
                                                        setDocumentNumber(e.target.value)
                                                        documentType === 80 ?
                                                            setIsValidDocument(verifyCuit(e.target.value).isCuit) :
                                                            setIsValidDocument(verifyDni(e.target.value))
                                                    }}
                                                />
                                            </InputGroup>

                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <FormGroup>
                                            <Label>Razón Social</Label>
                                            <Input
                                                required
                                                type="text"
                                                placeholder="Razón social..."
                                                value={businessName}
                                                onChange={e => {
                                                    setBusinessName(e.target.value)
                                                }}
                                                onBlur={() => {
                                                    setFantasieName(businessName)
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
                                                required
                                                id="fantasie-name"
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