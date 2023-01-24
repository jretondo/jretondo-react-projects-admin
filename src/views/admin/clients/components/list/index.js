import API_ROUTES from '../../../../../api/routes';
import { TableList } from 'components/Lists/TableList';
import { SearchFormComponent } from 'components/Search/Search1';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import React, { useEffect, useState } from 'react';
import { Button, CardBody, CardFooter, CardHeader, Col, Label, Pagination, Row, Spinner } from 'reactstrap';
import ClientRow from './row';

const ClientsList = ({
    setNewForm,
    setIdClient,
    stringSearched,
    setStringSearched
}) => {
    const [refreshList, setRefreshList] = useState(false)
    const [page, setPage] = useState(1)
    const [list, setList] = useState(<></>)

    const {
        dataPage,
        itemsPerPage,
        totalItems,
        errorList,
        loadingList
    } = useAxiosGetList(
        API_ROUTES.clientsDir.clients,
        page, refreshList, [{ text: stringSearched }]
    )

    useEffect(() => {
        if (errorList) {
            setList(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td> <span style={{ textAlign: "center", marginRight: "auto", marginLeft: "auto" }}> No hay clientes cargados</span></td>
                </tr>
            )
        } else {
            setList(
                dataPage.map((item, key) => {
                    let first
                    if (key === 0) {
                        first = true
                    } else {
                        first = false
                    }
                    return (
                        <ClientRow
                            id={key}
                            key={key}
                            item={item}
                            refreshToggle={() => setRefreshList(!refreshList)}
                            setIdClient={setIdClient}
                            first={first}
                            page={page}
                            setPage={setPage}
                            setNewForm={setNewForm}
                        />
                    )
                })
            )
        }
        return () => {
            setList(<></>)
        }
        // eslint-disable-next-line
    }, [dataPage, errorList, loadingList])

    return (<>
        <CardHeader>
            <Row>
                <Col md="4">
                    <Label>Listado de Clientes</Label>
                </Col>
                <Col md="8" style={{ textAlign: "right" }}>
                    <SearchFormComponent
                        setStringSearched={setStringSearched}
                        stringSearched={stringSearched}
                        setRefreshList={setRefreshList}
                        refreshList={refreshList}
                        title="Buscar un Cliente"
                    />
                </Col>
            </Row>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md="12">
                    {
                        !loadingList ?
                            <TableList
                                titlesArray={["T. Doc.", "Nº Doc.", "Razón Social", "Nombre de Fantasía", "email", "Cond. IVA", ""]}
                            >
                                {list}
                            </TableList>
                            :
                            <div style={{ textAlign: "center", marginTop: "0" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                            </div>
                    }
                </Col>
            </Row>
        </CardBody>
        <CardFooter>
            <Row>
                <Col md="6" style={{ textAlign: "left" }}>
                    <Button
                        onClick={e => {
                            e.preventDefault()
                            setIdClient(false)
                            setNewForm(true)
                        }}
                        color="primary">Nuevo Cliente</Button>
                </Col>
                <Col md="6" style={{ textAlign: "right" }}>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                    />
                </Col>
            </Row>
        </CardFooter>
    </>)
}

export default ClientsList