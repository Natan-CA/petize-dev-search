import { React } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Home() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/perfil/${name}`);
    };

    return (
        <Container maxWidth="lg">
            <Box className="content">
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{marginBottom: 4}}>
                        <div className="main-title align-center">
                            <span className="main-logo-primary">Search </span>
                            <span className="main-logo-secondary">d_evs</span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit} className="form">
                            <TextField
                                type="text"
                                value={name}
                                placeholder="Search"
                                size="medium"
                                sx={{ width: 592 }}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                sx={{
                                    width: 176,
                                    fontFamily: "Inter",
                                    padding: "12px 0px",
                                    textTransform: "none",
                                    fontSize: 18,
                                    marginLeft: '32px',
                                }}
                                type="submit"
                                variant="contained"
                                size="large"
                                color="secondary"
                            >
                                <span>
                                    Search
                                </span>
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Home;
