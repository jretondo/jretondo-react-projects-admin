import API_ROUTES from '../../../api/routes';
import Header from 'components/Headers/Header';
import SecureRoutesContext from 'context/secureRoutes';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup, Card, CardBody, Collapse, Container } from 'reactstrap';
import ButtonOpenCollapse from 'components/Buttons/buttonOpenCollapse';
import { useWindowSize } from 'hooks/UseWindowSize';
import NewInvoiceForm from './components/newInvoice';
import InvoicesList from './components/list';
import InvoicesReports from './components/reports';

const InvoicesModules = () => {
    const [moduleActive, setModuleActive] = useState(0)
    const { setUrlRoute } = useContext(SecureRoutesContext)

    useEffect(() => {
        setUrlRoute(API_ROUTES.routesDir.sub.invoices)
    }, [setUrlRoute])

    const width = useWindowSize()

    return (<>
        <Header />
        <Container className="mt--7" fluid>
            <div style={{ width: "100%" }}>
                <Card style={{ marginTop: "5px", marginBottom: "10px" }}>
                    <CardBody style={{ textAlign: "center" }}>
                        <ButtonGroup vertical={width > 1030 ? false : true}>
                            <ButtonOpenCollapse
                                action={() => setModuleActive(0)}
                                tittle={"Nueva Factura"}
                                active={moduleActive === 0 ? true : false}
                            />
                            <ButtonOpenCollapse
                                action={() => setModuleActive(1)}
                                tittle={"Listados"}
                                active={moduleActive === 1 ? true : false}
                            />
                            <ButtonOpenCollapse
                                action={() => setModuleActive(2)}
                                tittle={"Reportes"}
                                active={moduleActive === 2 ? true : false}
                            />
                        </ButtonGroup>
                    </CardBody>
                </Card>
                {
                    /*
                       <InfoAfipMod
                        afipStatus={afipStatus}
                        setRefreshAfip={setRefreshAfip}
                        refreshAfip={refreshAfip}
                    />
                    */
                }
                <Collapse isOpen={moduleActive === 0 ? true : false} >
                    <NewInvoiceForm />
                </Collapse>
                <Collapse isOpen={moduleActive === 1 ? true : false} >
                    <InvoicesList />
                </Collapse>
                <Collapse isOpen={moduleActive === 2 ? true : false} >
                    <InvoicesReports />
                </Collapse>
            </div>
        </Container>
    </>)
}

export default InvoicesModules