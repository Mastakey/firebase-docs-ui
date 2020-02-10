import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { getTags } from "../redux/actions/tagActions";
import TagList from "../components/app/tag/TagList";

const styles = {
  paper: {
    padding: 10
  },
  header: {
    marginBottom: 10
  },
  mdoc: {}
};

export class Home extends Component {
  async componentDidMount() {
    this.props.getTags();
  }
  render() {
    const classes = this.props.classes;
    const tags = this.props.tag.tags;
    let tagArray = [];
    if (tags && tags.length > 0 && Array.isArray(tags)) {
      tags.forEach(tag => {
        tagArray.push(tag.name);
      });
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Home</Typography>
            <Typography variant="body1">Hello!</Typography>
            <Typography variant="h5">
              <Link to={`/mdoc`}>All docs</Link>
            </Typography>
            <Typography variant="h5">
              <Link to={`/mdoc/limit/20`}>Last 20</Link>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {tagArray ? <TagList tags={tagArray} /> : null}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  tag: state.tag
});

export default connect(mapStateToProps, { getTags })(withStyles(styles)(Home));
