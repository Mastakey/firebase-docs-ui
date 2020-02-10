import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getTag, deleteTag } from "../../redux/actions/tagActions";

//Components
import ViewTag from "../../components/app/tag/ViewTag";
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

class tagView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getTag(id);
  }
  async deleteTag() {
    const id = this.props.match.params.id;
    await this.props.deleteTag(id, this.props.history);
  }
  render() {
    const tag = this.props.tag.tag;
    const loading = this.props.tag.readLoading;
    const error = this.props.tag.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Tags", url: "/tag" }
        ]}
        currentPage={{ name: tag.name, url: "/tag" }}
        title={"Tags"}
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
      body = <ViewTag tag={tag} deleteTag={this.deleteTag.bind(this)} />;
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

tagView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ tag: state.tag });

export default connect(mapStateToProps, { getTag, deleteTag })(
  withStyles(styles)(tagView)
);
