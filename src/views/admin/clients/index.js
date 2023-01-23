import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';
import { Card, CardHeader, Container } from 'reactstrap';
import Header from 'components/Headers/Header';
import ClientForm from './components/form';
import ClientsList from './components/list';

const ClientsModule = () => {
    const [newForm, setNewForm] = useState(false)
    const [idClient, setIdClient] = useState(false)
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        if (!idClient) {
            setNewForm(true)
        }
    }, [idClient])

    useEffect(() => {
        if (!newForm) {
            setIdClient(false)
        }
    }, [newForm])

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.userAdmin)
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
                            idClient={idClient}
                        />
                }

            </Card>
        </Container>
    </>)
}

export default ClientsModule