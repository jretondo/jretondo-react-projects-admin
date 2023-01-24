import React from 'react';
import { Card, CardBody } from 'reactstrap';
import FooterInvoiceForm from './components/footer';
import HeaderInvoiceForm from './components/header';
import InvoiceItems from './components/itemsList';

const NewInvoiceForm = () => {

    return (
        <Card style={{ marginTop: "30px" }}>
            <CardBody>
                <HeaderInvoiceForm />
                <InvoiceItems />
                <FooterInvoiceForm />
            </CardBody>
        </Card>
    )
}

export default NewInvoiceForm