import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getMdoc, editMdoc } from "../../redux/actions/mdocActions";

//Components
import EditMdoc from "../../components/app/mdoc/EditMdoc";
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

class mdocEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          options: "",
        links: "",
        status: "",
        pagenum: "",
        folder: "",
        tags: "",

    };
  }
  async componentDidMount() {
    await this.props.getMdoc(this.props.match.params.id);
    const mdoc = this.props.mdoc.mdoc;
    const errors = this.props.mdoc.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: mdoc.name,
        description: mdoc.description,
        descriptionDelta: mdoc.descriptionDelta,
      options: mdoc.options,
      links: mdoc.links,
      status: mdoc.status,
      pagenum: mdoc.pagenum,
      folder: mdoc.folder,
      tags: mdoc.tags,

      });
    }
  }
  async editMdoc(data) {
    await this.props.editMdoc(
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
      options: this.state.options,
      links: this.state.links,
      status: this.state.status,
      pagenum: this.state.pagenum,
      folder: this.state.folder,
      tags: this.state.tags,

    };
    await this.props.editMdoc(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.mdoc.readLoading;
    const saveLoading = this.props.mdoc.writeLoading;
    const error = this.props.mdoc.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Mdocs", url: "/mdoc" },
          { name: this.state.name, url: `/mdoc/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Mdocs"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditMdoc
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

mdocEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getMdoc: PropTypes.func.isRequired,
  editMdoc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  mdoc: state.mdoc
});

export default connect(mapStateToProps, { getMdoc, editMdoc })(
  withStyles(styles)(mdocEdit)
);
