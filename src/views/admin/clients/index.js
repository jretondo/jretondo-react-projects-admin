import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import API_ROUTES from '../../../api/routes';
import { Card, Container } from 'reactstrap';
import Header from 'components/Headers/Header';
import ClientForm from './components/form';
import ClientsList from './components/list';

const ClientsModule = () => {
    const [newForm, setNewForm] = useState(false)
    const [idClient, setIdClient] = useState(false)
    const [stringSearched, setStringSearched] = useState("")
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        if (!idClient) {
            setNewForm(false)
        }
    }, [idClient])

    useEffect(() => {
        if (!newForm) {
            setIdClient(false)
        }
    }, [newForm])

    useEffect(() => {
        setUrlRoute(API_ROUTES.routesDir.sub.clients)
    }, [setUrlRoute])

    return (<>
        <Header />
        <Container className="mt--7" fluid>
            <Card>
                {
                    newForm ?
                        <ClientForm
                            setNewForm={setNewForm}
                            idClient={idClient}
                        /> :
                        <ClientsList
                            setNewForm={setNewForm}
                            setIdClient={setIdClient}
                            stringSearched={stringSearched}
                            setStringSearched={setStringSearched}
                        />
                }
            </Card>
        </Container>
    </>)
}

export default ClientsModule