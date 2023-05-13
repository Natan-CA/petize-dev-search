import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function Perfil(props) {
    let { user } = useParams();
    const [repositorio, setRepositorio] = useState([]);
    const [name, setName] = useState(user);
    const navigate = useNavigate();

    const goToHome = (event) => {
        event.preventDefault();
        navigate(`/`);
    };

    const fetchUser = () => {
        axios.get(`https://api.github.com/users/${user}`).then((response) => {
            console.log(response.data);
            setRepositorio(response.data);
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 3 }}>
                <Grid container spacing={2}>
                    {/* nav-bar */}
                    <Grid item xs={3}>
                        <div className="main-title title-sm">
                            <span className="main-logo-primary">Search </span>
                            <span className="main-logo-secondary">d_evs</span>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <form className="nav-form">
                            <TextField
                                type="text"
                                value={name}
                                placeholder="Search"
                                size="small"
                                sx={{ width: 590 }}
                                disabled={true}
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
                                    fontFamily: "Inter",
                                    textTransform: "none",
                                    marginLeft: "20px",
                                }}
                                type="submit"
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={goToHome}
                            >
                                <span>Go Back</span>
                            </Button>
                        </form>
                    </Grid>
                    {/* user card */}
                    <Grid item xs={3} sx={{ marginTop: 12 }}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src={repositorio.avatar_url}
                                        aria-label="usuario"
                                        alt="usuario"
                                    ></Avatar>
                                }
                                title={repositorio.name}
                                subheader={repositorio.twitter_username}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* repositories card */}
                    <Grid item xs={9} sx={{ marginTop: 12 }}>
                        <Card>
                            <CardContent></CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Perfil;
