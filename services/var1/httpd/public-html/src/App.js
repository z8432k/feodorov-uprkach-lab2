import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button, ButtonGroup} from "@mui/material";
import {useState} from "react";
import Rooms from "./Rooms";
import Clients from "./Clients";
import Rents from "./Rents";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));


function renderPage(page) {
    switch (page) {
        case 'rooms':
            return (<Rooms />);
        case 'clients':
            return (<Clients />);
        default:
            return (<Rents />)
    }
}

export default function RowAndColumnSpacing() {
    const [page, setPage] = useState('rooms');

    return (
        <Box sx={{ width: "100%" }}>
            <Grid  container
                   direction="column"
                   justifyContent="flex-start"
                   alignItems="center"
                   spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => setPage("rooms")}>Rooms</Button>
                            <Button onClick={() => setPage("clients")}>Clients</Button>
                            <Button onClick={() => setPage("rent")}>Rent</Button>
                        </ButtonGroup>
                    </Item>
                </Grid>
                {
                    renderPage(page)
                }
            </Grid>
        </Box>
    );
}