import React, { Component, Fragment } from "react";
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
  pageHeader: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: "20px"
  },
  textFieldHidden: {
    marginTop: "20px",
    display: "none"
  },
  progress: {
    position: "absolute"
  },
  saveButton: {
    marginRight: "20px",
    width: "100px"
  },
  richText: {
    marginTop: "20px"
  },
  richTextHidden: {
    display: "none"
  },
  bottomlink: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#3f51b5"
  }
};

class EditMdocFull extends Component {
  render() {
    const classes = this.props.classes;
    let showHideClass = this.props.state.hideAdvancedOptions
      ? classes.textFieldHidden
      : classes.textField;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            name="name"
            autoComplete="off"
            label="Name"
            variant="outlined"
            onChange={this.props.handleChange}
            value={this.props.state.name}
            fullWidth
          />
          <ReactQuill
            className={classes.richTextHidden}
            value={this.props.state.description}
            modules={QuillSettings.modules}
            formats={QuillSettings.formats}
            name="description"
            onChange={this.props.handleQuillChange}
          />
          <ReactQuill
            className={classes.richText}
            value={this.props.state.content}
            modules={QuillSettings.modules}
            formats={QuillSettings.formats}
            name="content"
            onChange={this.props.handleQuillChangeContent}
          />
          <TextField
            className={showHideClass}
            name="options"
            autoComplete="off"
            label="Options"
            variant="outlined"
            value={this.props.state.options}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={showHideClass}
            name="links"
            autoComplete="off"
            label="Links"
            variant="outlined"
            value={this.props.state.links}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={showHideClass}
            name="status"
            autoComplete="off"
            label="Status"
            variant="outlined"
            value={this.props.state.status}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={showHideClass}
            name="pagenum"
            autoComplete="off"
            label="Pagenum"
            variant="outlined"
            value={this.props.state.pagenum}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="folder"
            autoComplete="off"
            label="Folder"
            variant="outlined"
            value={this.props.state.folder}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="tags"
            autoComplete="off"
            label="Tags"
            variant="outlined"
            value={this.props.state.tags}
            onChange={this.props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.saveButton}
            variant="contained"
            color="primary"
            disabled={this.props.loading}
            onClick={this.props.handleSave}
          >
            Save
            {this.props.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Button
            component={Link}
            to={`/mdoc/${this.props.id}`}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Link
            to="#"
            className={classes.bottomlink}
            href="#"
            onClick={this.props.toggleAdvancedOptions}
          >
            {this.props.state.hideAdvancedOptions ? (
              <Fragment>show more options</Fragment>
            ) : (
              <Fragment>hide more options</Fragment>
            )}
          </Link>
          <ErrorMessages error={this.props.error} />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    );
  }
}

EditMdocFull.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(EditMdocFull));
