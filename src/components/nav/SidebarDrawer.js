import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import FolderIcon from "@material-ui/icons/Folder";
import Link from "@material-ui/core/Link";

const navLinks = [
  {name: "Folders", link: "/folder"}
]

class SidebarDrawer extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Docs"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {navLinks.map((navLink, index) => (
            <Link href="/folder" className={classes.navLink} key={navLink.name}>
              <ListItem button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={navLink.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

export default SidebarDrawer;
