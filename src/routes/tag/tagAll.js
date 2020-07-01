import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getTags } from "../../redux/actions/tagActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllTag from "../../components/app/tag/AllTag";
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

class tagAll extends Component {
  async componentDidMount() {
    this.props.getTags();
  }
  render() {
    const classes = this.props.classes;
    const tags = this.props.tag.tags;
    const loading = this.props.tag.readLoading;
    const error = this.props.tag.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Tags", url: "/tag" }}
        title={"Tags"}
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
            <AllTag tags={tags} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/tag/create`}>
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

tagAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tag: state.tag
});

export default connect(mapStateToProps, {
  getTags,
  addMessage
})(withStyles(styles)(tagAll));
