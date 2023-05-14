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
import mail from "./../assets/email-mail.png";
import followers from "./../assets/group-user.png";
import heart from "./../assets/heart.png";
import link from "./../assets/link.png";
import office from "./../assets/office.png";
import pin from "./../assets/pin-location.png";
import twitter from "./../assets/twitter.png";
import star from "./../assets/star.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import moment from "moment";
import localization from "moment/locale/pt-br";
moment.locale("pt-br", localization);

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

    const fetchUser = () => {
        axios.get(`https://api.github.com/users/${user}`).then((response) => {
            setUserInfo(response.data);
        });
    };

    const fetchRepos = () => {
        axios
            .get(
                `https://api.github.com/search/repositories?q=user:${user}+stars:>=0`
            )
            .then((response) => {
                setRepos(response.data);
            });
    };

    useEffect(() => {
        fetchUser();
        fetchRepos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function ItemLista({ icon, alt, data, prefix, isLink }) {
        if (userInfo.length === 0 || data === null || data === "") return null;
        else {
            prefix = prefix || "";
            return (
                <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>
                        <img src={icon} alt={alt} />
                    </ListItemIcon>
                    <ListItemText>
                        {isLink ? (
                            <Link
                                href={
                                    prefix
                                        ? `https://twitter.com/${data}`
                                        : data
                                }
                            >
                                {prefix + data}
                            </Link>
                        ) : (
                            <span>{prefix + data}</span>
                        )}
                    </ListItemText>
                </ListItem>
            );
        }
    }

    function RepoLista({ rep }) {
        if (rep.length === 0) return null;
        else {
            const repositorios = rep.items;
            return repositorios.map((r, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                    <CardContent
                        sx={{ paddingY: 0, "&:last-child": { pb: 0 } }}
                    >
                        <List>
                            <ListItem disableGutters>
                                <Link
                                    href={r.html_url}
                                    underline="hover"
                                    color="inherit"
                                >
                                    <Typography variant="h6">
                                        {r.name}
                                    </Typography>
                                </Link>
                            </ListItem>
                            <ListItem disableGutters>
                                <Typography variant="body2" color='#4A5568'>
                                    {r.description}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters>
                                <ListItemIcon
                                    sx={{ minWidth: 0, marginRight: 1 }}
                                >
                                    <img src={star} alt="star_icon" />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="body2" color='#4A5568'>
                                        {r.stargazers_count} •{" "}
                                        {moment(r.updated_at).fromNow()}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            ));
        }
    }

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
                    <Grid item xs={9} sx={{ marginTop: 12 }}>
                        <RepoLista rep={repos} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Perfil;
