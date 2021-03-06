import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getFolders } from "../../redux/actions/folderActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllFolder from "../../components/app/folder/AllFolder";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

//Material Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  fab: {
    marginTop: "20px"
  }
};

class folderAll extends Component {
  async componentDidMount() {
    this.props.getFolders();
  }
  render() {
    const classes = this.props.classes;
    const folders = this.props.folder.folders;
    const loading = this.props.folder.readLoading;
    const error = this.props.folder.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Folders", url: "/folder" }}
        title={"Folders"}
      />
    );
    let body;
    let footer;
    //loading
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <Grid container item xs={12}>
            <AllFolder folders={folders} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/folder/create`}>
              <Fab size="small" color="default" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
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

folderAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getFolders: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  folder: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  folder: state.folder
});

export default connect(mapStateToProps, {
  getFolders,
  addMessage
})(withStyles(styles)(folderAll));
