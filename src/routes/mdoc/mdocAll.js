import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getMdocs } from "../../redux/actions/mdocActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllMdoc from "../../components/app/mdoc/AllMdoc";
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

class mdocAll extends Component {
  async componentDidMount() {
    this.props.getMdocs();
  }
  render() {
    const classes = this.props.classes;
    const mdocs = this.props.mdoc.mdocs;
    const loading = this.props.mdoc.readLoading;
    const error = this.props.mdoc.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Mdocs", url: "/mdoc" }}
        title={"Mdocs"}
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
            <AllMdoc mdocs={mdocs} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/mdoc/create`}>
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

mdocAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getMdocs: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  mdoc: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mdoc: state.mdoc
});

export default connect(mapStateToProps, {
  getMdocs,
  addMessage
})(withStyles(styles)(mdocAll));
