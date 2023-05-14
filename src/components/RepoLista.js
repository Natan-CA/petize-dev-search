import { React } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import star from "./../assets/star.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import moment from "moment";
import localization from "moment/locale/pt-br";
moment.updateLocale("pt-br", localization);

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

export default RepoLista