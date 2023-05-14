import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import mail from "./../assets/email-mail.png";
import followers from "./../assets/group-user.png";
import heart from "./../assets/heart.png";
import link from "./../assets/link.png";
import office from "./../assets/office.png";
import pin from "./../assets/pin-location.png";
import twitter from "./../assets/twitter.png";
import List from "@mui/material/List";
import ItemLista from "./../components/ItemLista";
import RepoLista from "./../components/RepoLista";
import { fetchRepos, fetchUser } from "./../services/user";


function Perfil() {
    let { user } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [repos, setRepos] = useState([]);
    const [name, setName] = useState(user);
    const navigate = useNavigate();

    const goToHome = (event) => {
        event.preventDefault();
        navigate(`/`);
    };

    useEffect(() => {
        fetchUser(user).then((response) => setUserInfo(response.data));
        fetchRepos(user).then((response) => setRepos(response.data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 3 }} justifyContent="center">
                <Grid container spacing={2}>
                    {/* nav-bar */}
                    <Grid item md={3} sm={5} xs={12}>
                        <div className="main-title title-sm">
                            <span className="main-logo-primary">Search </span>
                            <span className="main-logo-secondary">d_evs</span>
                        </div>
                    </Grid>
                    <Grid item md={9} sm={7} xs={12}>
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
                                    whiteSpace: "nowrap"
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
                    <Grid item md={3} sm={5} xs={12} sx={{ marginTop: 12 }}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src={userInfo.avatar_url}
                                        aria-label="usuario"
                                        alt="usuario"
                                    ></Avatar>
                                }
                                title={userInfo.name}
                                subheader={userInfo?.login}
                            />
                            <CardContent sx={{ paddingTop: 1 }}>
                                <Typography variant="body2">
                                    {userInfo?.bio}
                                </Typography>
                                <List dense={true}>
                                    <ItemLista
                                        icon={followers}
                                        data={userInfo.followers}
                                        alt="followers_icon"
                                    />
                                    <ItemLista
                                        icon={heart}
                                        data={userInfo.following}
                                        alt="following_icon"
                                    />
                                    <br />
                                    <ItemLista
                                        icon={office}
                                        data={userInfo.company}
                                        alt="office_icon"
                                    />
                                    <ItemLista
                                        icon={pin}
                                        data={userInfo.location}
                                        alt="pin_location_icon"
                                    />
                                    <ItemLista
                                        icon={mail}
                                        data={userInfo.email}
                                        alt="email_icon"
                                    />
                                    <ItemLista
                                        icon={link}
                                        data={userInfo.blog}
                                        alt="link_icon"
                                        isLink={true}
                                    />
                                    <ItemLista
                                        icon={twitter}
                                        data={userInfo.twitter_username}
                                        prefix={"@"}
                                        alt="twitter_icon"
                                        isLink={true}
                                    />
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* repositories card */}
                    <Grid item md={9} sm={7} xs={12} sx={{ marginTop: 12 }}>
                        <RepoLista rep={repos} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Perfil;
