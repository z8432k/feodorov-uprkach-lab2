import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {Button, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    function loadRooms() {
        fetch("http://localhost:3000/cgi-bin/list.cgi")
            .then((resp) => resp.json())
            .then(setRooms);
    }

    useEffect(loadRooms, []);

    function onDelClick(data) {
        console.log(data);
        fetch("http://localhost:3000/rooms/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadRooms);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'room',
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

    const value1Ref = useRef('');
    const value2Ref = useRef('');

    function addRoom() {
        fetch("http://localhost:3000/rooms/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value1Ref.current.value,
                square: value2Ref.current.value
            })
        })
            .then(loadRooms);
    }

    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rooms}
                            columns={columns}
                            disableSelectionOnClick
                            disableColumnMenu
                        />
                    </div>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <div>
                        <TextField
                            label="Name"
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="small"
                            inputRef={value1Ref}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Square"
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="small"
                            inputRef={value2Ref}
                        />
                    </div>
                    <div>
                        <Button onClick={addRoom} variant="contained">add</Button>
                    </div>
                </Item>
            </Grid>
        </>
    );
}