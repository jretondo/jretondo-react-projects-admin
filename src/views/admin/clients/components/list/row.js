import React, { useContext } from 'react'
import API_ROUTES from '../../../../../api/routes'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import swal from 'sweetalert'
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';
import 'components/Lists/shimmer.css';

const ClientRow = ({
    id,
    item,
    refreshToggle,
    setIdClient,
    first,
    page,
    setPage,
    setNewForm
}) => {
    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosDelete, loadingActions } = useContext(actionsBackend)

    const deleteUser = async (e, id, name, first, page) => {
        e.preventDefault()
        swal({
            title: "Eliminar al cliente " + name + "!",
            text: "¿Está seguro de eliminar a este usuario? Esta desición es permanente.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                let backPage = false
                if (willDelete) {
                    const response = await axiosDelete(API_ROUTES.clientsDir.clients, id)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado al cliente ${item.business_name} (CUIT/DNI: ${item.document_number})`)
                        newAlert("success", "Cliente eliminado con éxito!", "")
                        if (backPage) {
                            setPage(parseInt(page - 1))
                        } else {
                            refreshToggle()
                        }
                    } else {
                        newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
                    }
                }
            });
    }

    const details = (e, item) => {
        e.preventDefault()
        setNewForm(true)
        setIdClient(item)
    }

    return (
        <tr key={id} className={loadingActions ? "shimmer" : ""} >
            <td style={{ textAlign: "center" }}>
                {item.document_type === 80 ? "CUIT" : "DNI"}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.document_number}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.business_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.fantasie_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.email}
            </td>
            <td style={{ textAlign: "center" }}>
                {
                    item.IvaConditions[0].description
                }
            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={e => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => details(e, item)}
                        >
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => deleteUser(e, item.id, item.business_name, first, page)}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default ClientRow