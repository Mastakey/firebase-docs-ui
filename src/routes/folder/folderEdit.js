import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getFolder, editFolder } from "../../redux/actions/folderActions";

//Components
import EditFolder from "../../components/app/folder/EditFolder";
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

class folderEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          parent: "",
        tags: "",
        section: "",

    };
  }
  async componentDidMount() {
    await this.props.getFolder(this.props.match.params.id);
    const folder = this.props.folder.folder;
    const errors = this.props.folder.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: folder.name,
        description: folder.description,
        descriptionDelta: folder.descriptionDelta,
      parent: folder.parent,
      tags: folder.tags,
      section: folder.section,

      });
    }
  }
  async editFolder(data) {
    await this.props.editFolder(
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
      parent: this.state.parent,
      tags: this.state.tags,
      section: this.state.section,

    };
    await this.props.editFolder(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.folder.readLoading;
    const saveLoading = this.props.folder.writeLoading;
    const error = this.props.folder.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Folders", url: "/folder" },
          { name: this.state.name, url: `/folder/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Folders"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditFolder
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

folderEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getFolder: PropTypes.func.isRequired,
  editFolder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  folder: state.folder
});

export default connect(mapStateToProps, { getFolder, editFolder })(
  withStyles(styles)(folderEdit)
);
