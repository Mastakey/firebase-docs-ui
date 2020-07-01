import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getTag, editTag } from "../../redux/actions/tagActions";

//Components
import EditTag from "../../components/app/tag/EditTag";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  saveButton: {
    marginRight: "20px",
    width: "100px"
  }
};

class tagEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          status: "",
        docs: "",

    };
  }
  async componentDidMount() {
    await this.props.getTag(this.props.match.params.id);
    const tag = this.props.tag.tag;
    const errors = this.props.tag.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: tag.name,
        description: tag.description,
        descriptionDelta: tag.descriptionDelta,
      status: tag.status,
      docs: tag.docs,

      });
    }
  }
  async editTag(data) {
    await this.props.editTag(
      this.props.match.params.id,
      data,
      this.props.history
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  handleSave = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      descriptionDelta: this.state.descriptionDelta,
      status: this.state.status,
      docs: this.state.docs,

    };
    await this.props.editTag(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.tag.readLoading;
    const saveLoading = this.props.tag.writeLoading;
    const error = this.props.tag.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Tags", url: "/tag" },
          { name: this.state.name, url: `/tag/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Tags"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditTag
          handleSave={this.handleSave.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleQuillChange={this.handleQuillChange.bind(this)}
          id={this.props.match.params.id}
          loading={saveLoading}
          state={this.state}
          error={error}
        />
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

tagEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getTag: PropTypes.func.isRequired,
  editTag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tag: state.tag
});

export default connect(mapStateToProps, { getTag, editTag })(
  withStyles(styles)(tagEdit)
);
