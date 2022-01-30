import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Rents() {
    const [rents, setRents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [clients, setClients] = useState([]);

    function loadRents() {
        return fetch("http://localhost:3000/rents/")
            .then((resp) => resp.json())
            .then(setRents);
    }

    useEffect(async () => {
        await fetch("http://localhost:3000/clients/")
            .then((resp) => resp.json())
            .then(setClients);
        await fetch("http://localhost:3000/rooms/")
            .then((resp) => resp.json())
            .then(setRooms);
        await loadRents();
    }, []);

    function onDelClick(data) {
        fetch("http://localhost:3000/rents/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadRents);
    };

    const columns = [
        {
            field: 'client',
            headerName: 'Client',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => data.row.client.name
        },
        {
            field: 'room',
            headerName: 'Room',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => data.row.room.name
        },
        {
            field: 'tax',
            headerName: 'tax',
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

    const [client, setClient] = React.useState('');
    const [room, setRoom] = React.useState('');
    const taxRef = useRef('');


    const handleClient = (event) => {
        setClient(event.target.value);
    };

    const handleRoom = (event) => {
        setRoom(event.target.value);
    };

    function addRent() {
        fetch("http://localhost:3000/rents/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: client,
                room_id: room,
                tax: taxRef.current.value
            })
        })
        .then(loadRents);
    }

    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rents}
                            columns={columns}
                            disableSelectionOnClick
                            disableColumnMenu
                        />
                    </div>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Client</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={client}
                            label="Client"
                            onChange={handleClient}
                        >
                            {
                                clients.map((c, k) => (<MenuItem key={k} value={c.id}>{c.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Room</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={room}
                            label="Room"
                            onChange={handleRoom}
                        >
                            {
                                rooms.map((r, k) => (<MenuItem key={k} value={r.id}>{r.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <div>
                        <TextField
                            label="tax"
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="small"
                            inputRef={taxRef}
                        />
                    </div>
                    <Button onClick={addRent} variant="contained">add</Button>
                </Item>
            </Grid>
        </>
    );
}