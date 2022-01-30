import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Button, TextField} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Clients() {
    const [clients, setClients] = useState([]);

    function loadClients() {
        fetch("http://localhost:3000/clients/")
            .then((resp) => resp.json())
            .then(setClients);
    }

    useEffect(loadClients, []);

    function onDelClick(data) {
        fetch("http://localhost:3000/clients/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadClients);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'client',
            width: 150,
            editable: false,
            sortable: false,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => (<Button onClick={(e) => onDelClick(data, e)} variant="contained" color="error">del</Button>)
        }
    ];

    const valueRef = useRef('');

    function addClient() {
        fetch("http://localhost:3000/clients/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: valueRef.current.value})
        })
        .then(loadClients);
    }

    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={clients}
                            columns={columns}
                            disableSelectionOnClick
                            disableColumnMenu
                        />
                    </div>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        inputRef={valueRef}
                    />
                    <Button onClick={addClient} variant="contained">add</Button>
                </Item>
            </Grid>
        </>
    );
}
