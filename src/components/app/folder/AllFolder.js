import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";
import FolderTreeView from "../../folders/FolderTreeView";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllFolder extends Component {
  render() {
    const folders = this.props.folders;
    return (
      <Fragment>
        {folders &&
          folders.length > 0 &&
          folders.map(folder => {
            if (folder.status !== "done") {
              const topHeader = folder.username;
              const title = folder.name;
              const subTitle = folder.status;
              const content = "";
              const link = {
                title: "Open Folder",
                url: `/folder/${folder.id}`
              };
              return (
                <SimpleCard
                  key={folder.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={folder.id}></Fragment>;
          })}
          <FolderTreeView folders={folders}/>
      </Fragment>
    );
  }
}

AllFolder.propTypes = {
  classes: PropTypes.object.isRequired,
  folders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllFolder));
