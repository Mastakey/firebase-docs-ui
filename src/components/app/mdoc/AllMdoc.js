import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllMdoc extends Component {
  render() {
    const mdocs = this.props.mdocs;
    return (
      <Fragment>
        {mdocs &&
          mdocs.length > 0 &&
          mdocs.map(mdoc => {
            if (mdoc.status !== "done") {
              const topHeader = mdoc.username;
              const title = mdoc.name;
              const subTitle = mdoc.status;
              const content = "";
              const link = {
                title: "Open Mdoc",
                url: `/mdoc/${mdoc.id}`
              };
              return (
                <SimpleCard
                  key={mdoc.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={mdoc.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllMdoc.propTypes = {
  classes: PropTypes.object.isRequired,
  mdocs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllMdoc));
