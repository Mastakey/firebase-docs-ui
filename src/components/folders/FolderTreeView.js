import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const styles = {};
// const folders = [
//   { name: "root", id: "1", parent: "" },
//   { name: "work", id: "2", parent: "1" },
//   { name: "personal", id: "3", parent: "1" },
//   { name: "sbm", id: "4", parent: "2" },
//   { name: "camunda", id: "5", parent: "2" },
//   { name: "setup", id: "6", parent: "5" },
//   { name: "code", id: "7", parent: "5" }
// ];

  const getTreeItem = (folder, folders) => {
    return (
      <TreeItem nodeId={folder.id} label={folder.name} key={folder.id}>
        {folders.map(f => {
          if (f.parent === folder.id) {
            return getTreeItem(f, folders);
          } else {
            return <Fragment key={f.id}></Fragment>;
          }
        })}
      </TreeItem>
    );
  };

class FolderTreeView extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }
  handleChange = (event, nodes) => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  getRootFolder = (folders) => {
    for (var i=0; i<folders.length; i++){
      if (folders[i].name === 'root'){
        return folders[i];
      }
    }
    return {};
  }
  render() {
    const classes = this.props.classes;
    const folders = this.props.folders;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {folders && folders.length > 0 ? (
              <Fragment>{getTreeItem(this.getRootFolder(folders), folders)}</Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </TreeView>
        </Grid>
      </Grid>
    );
  }
}

FolderTreeView.propTypes = { classes: PropTypes.object.isRequired };

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(FolderTreeView));
