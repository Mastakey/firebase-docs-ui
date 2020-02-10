import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createMdoc } from "../../redux/actions/mdocActions";

//Components
import CreateMdoc from "../../components/app/mdoc/CreateMdoc";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class mdocCreate extends Component {
  async createMdoc(data) {
    await this.props.createMdoc(data, this.props.history);
  }
  render() {
    const loading = this.props.mdoc.loading;
    const error = this.props.mdoc.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "docs", url: "/mdoc" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Mdoc"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateMdoc
          loading={loading}
          createMdoc={this.createMdoc.bind(this)}
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

mdocCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createMdoc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  mdoc: state.mdoc
});

export default connect(mapStateToProps, { createMdoc })(
  withStyles(styles)(mdocCreate)
);
