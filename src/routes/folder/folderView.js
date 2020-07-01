import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getFolder, deleteFolder } from "../../redux/actions/folderActions";
import { getMdocsByFolder } from "../../redux/actions/mdocActions";

//Components
import AllMdoc from "../../components/app/mdoc/AllMdoc";
import AllFolder from "../../components/app/folder/AllFolder";
import ViewFolder from "../../components/app/folder/ViewFolder";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  },
  docHeader: {
    marginTop: "20px"
  }
};

class folderView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getFolder(id);
    await this.props.getMdocsByFolder(id);
  }
  async deleteFolder() {
    const id = this.props.match.params.id;
    await this.props.deleteFolder(id, this.props.history);
  }
  render() {
    const folder = this.props.folder.folder;
    const loading = this.props.folder.readLoading;
    const error = this.props.folder.error;
    const mdocs = this.props.mdoc.mdocs;
    const classes = this.props.classes;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Folders", url: "/folder" }
        ]}
        currentPage={{ name: folder.name, url: "/folder" }}
        title={`Folder: ${folder.name}`}
      />
    );
    let body;
    let footer;
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <ViewFolder
            folder={folder}
            deleteFolder={this.deleteFolder.bind(this)}
          />
          <Typography variant="h3" className={classes.docHeader}>
            Folders
          </Typography>

          {this.props.folder && this.props.folder.folder && folder.children ? (
            <AllFolder folders={folder.children} />
          ) : (
            <Fragment></Fragment>
          )}

          <Typography variant="h3" className={classes.docHeader}>
            Docs
          </Typography>
          <AllMdoc mdocs={mdocs} />
        </Fragment>
      );
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {Object.keys(error).length === 0 && error.constructor === Object ? (
            <Fragment>{body}</Fragment>
          ) : (
            <ErrorHandler error={error} />
          )}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

folderView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteFolder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ folder: state.folder, mdoc: state.mdoc });

export default connect(mapStateToProps, {
  getFolder,
  deleteFolder,
  getMdocsByFolder
})(withStyles(styles)(folderView));
