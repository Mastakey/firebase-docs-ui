import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import { getTags } from "../../redux/actions/tagActions";
import TagList from "../../components/app/tag/TagList";


const styles = {};

class tagHome extends Component {
  async componentDidMount() {
    this.props.getTags();
  }
  render() {
    const tags = this.props.tag.tags;
    let tagArray = [];
    if (tags && tags.length > 0 && Array.isArray(tags)){
        tags.forEach(tag => {
            tagArray.push(tag.name);
        });
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {tagArray ? <TagList tags={tagArray} /> : null}
        </Grid>
      </Grid>
    );
  }
}

tagHome.propTypes = { classes: PropTypes.object.isRequired };

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps, { getTags })(
  withStyles(styles)(tagHome)
);
