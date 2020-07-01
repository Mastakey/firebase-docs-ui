import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllTag extends Component {
  render() {
    const tags = this.props.tags;
    return (
      <Fragment>
        {tags &&
          tags.length > 0 &&
          tags.map(tag => {
            if (tag.status !== "done") {
              const topHeader = tag.username;
              const title = tag.name;
              const subTitle = tag.status;
              const content = "";
              const link = {
                title: "Open Tag",
                url: `/tag/${tag.id}`
              };
              return (
                <SimpleCard
                  key={tag.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={tag.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllTag.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllTag));
