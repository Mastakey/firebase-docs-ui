import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import ErrorMessages from "../../error/ErrorMessages";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Quill
import ReactQuill from "react-quill";
import QuillSettings from "../../quill/QuillSettings";
import "react-quill/dist/quill.snow.css";

const styles = {
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  submitButton: {
    marginRight: "10px"
  },
  richText: {
    marginTop: "20px"
  }
};

class CreateMdoc extends Component {
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
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = async event => {
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
    await this.props.createMdoc(data);
  };
  handleCancel = async event => {};

  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    const error = this.props.error;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            name="name"
            autoComplete="off"
            label="Name"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <ReactQuill
            className={classes.richText}
            value={this.state.description}
            modules={QuillSettings.modules}
            formats={QuillSettings.formats}
            name="description"
            placeholder="Description"
            onChange={this.handleQuillChange.bind(this)}
          />
          <TextField
            className={classes.textField}
            name="options"
            autoComplete="off"
            label="Options"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="links"
            autoComplete="off"
            label="Links"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="status"
            autoComplete="off"
            label="Status"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="pagenum"
            autoComplete="off"
            label="Pagenum"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="folder"
            autoComplete="off"
            label="Folder"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="tags"
            autoComplete="off"
            label="Tags"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />

        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={this.handleSubmit}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={`/mdoc`}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessages error={error} />
        </Grid>
      </Grid>
    );
  }
}

CreateMdoc.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  createMdoc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(CreateMdoc));
