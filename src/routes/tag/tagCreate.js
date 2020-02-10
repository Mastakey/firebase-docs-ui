import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createTag } from "../../redux/actions/tagActions";

//Components
import CreateTag from "../../components/app/tag/CreateTag";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class tagCreate extends Component {
  async createTag(data) {
    await this.props.createTag(data, this.props.history);
  }
  render() {
    const loading = this.props.tag.loading;
    const error = this.props.tag.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Tags", url: "/tag" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Tag"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateTag
          loading={loading}
          createTag={this.createTag.bind(this)}
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

tagCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createTag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tag: state.tag
});

export default connect(mapStateToProps, { createTag })(
  withStyles(styles)(tagCreate)
);
