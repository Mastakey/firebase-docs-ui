import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getMdoc, deleteMdoc } from "../../redux/actions/mdocActions";

//Components
import ViewMdoc from "../../components/app/mdoc/ViewMdoc";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class mdocView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getMdoc(id);
  }
  async deleteMdoc() {
    const id = this.props.match.params.id;
    await this.props.deleteMdoc(id, this.props.history);
  }
  render() {
    const mdoc = this.props.mdoc.mdoc;
    const loading = this.props.mdoc.readLoading;
    const error = this.props.mdoc.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Mdocs", url: "/mdoc" }
        ]}
        currentPage={{ name: mdoc.name, url: "/mdoc" }}
        title={"Mdocs"}
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
      body = <ViewMdoc mdoc={mdoc} deleteMdoc={this.deleteMdoc.bind(this)} />;
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

mdocView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteMdoc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ mdoc: state.mdoc });

export default connect(mapStateToProps, { getMdoc, deleteMdoc })(
  withStyles(styles)(mdocView)
);
