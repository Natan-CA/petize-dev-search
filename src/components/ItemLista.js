import { React } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

function ItemLista({ icon, alt, data, prefix, isLink }) {
    if (data === null || data === "") return null;
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

export default ItemLista