import React, { useEffect } from "react";
import classNames from "classnames";
import { Grid, Box, isWidthUp, withWidth, withStyles } from "@material-ui/core";
import BlogCard from "./blog-card";

const styles = (theme: any) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});

function getVerticalBlogPosts(width: any, blogPosts: any) {
  const gridRows = [[], [], []] as any;
  let rows: any;
  let xs: any;
  if (isWidthUp("md", width)) {
    rows = 3;
    xs = 4;
  } else if (isWidthUp("sm", width)) {
    rows = 2;
    xs = 6;
  } else {
    rows = 1;
    xs = 12;
  }
  blogPosts.forEach((blogPost: any, index: number) => {
    gridRows[index % rows].push(
      <Grid key={blogPost.id} item xs={12}>
        <Box mb={3}>
          <BlogCard
            src={blogPost.src}
            title={blogPost.title}
            snippet={blogPost.snippet}
            date={blogPost.date}
            url={blogPost.url}
          />
        </Box>
      </Grid>
    );
  });
  return gridRows.map((element: any, index: string) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ));
}

function Blog(props: any) {
  const { classes, width, blogPosts, selectBlog } = props;

  useEffect(() => {
    selectBlog();
  }, [selectBlog]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          {getVerticalBlogPosts(width, blogPosts)}
        </Grid>
      </div>
    </Box>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(Blog));
