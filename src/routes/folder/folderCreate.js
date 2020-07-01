import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createFolder } from "../../redux/actions/folderActions";

//Components
import CreateFolder from "../../components/app/folder/CreateFolder";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class folderCreate extends Component {
  async createFolder(data) {
    await this.props.createFolder(data, this.props.history);
  }
  render() {
    const loading = this.props.folder.loading;
    const error = this.props.folder.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Folders", url: "/folder" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Folder"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateFolder
          loading={loading}
          createFolder={this.createFolder.bind(this)}
          error={error}
        />
      );
    }

    return (
      <Grid container alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {header}
            {body}
            {footer}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

folderCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createFolder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  folder: state.folder
});

export default connect(mapStateToProps, { createFolder })(
  withStyles(styles)(folderCreate)
);
