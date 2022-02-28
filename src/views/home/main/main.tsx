import React, { memo, useState, useCallback, useEffect } from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import { withStyles } from "@material-ui/core";
import smoothScrollTop from '../../../utilities/smooth-scroll-top';
import NavBar from '../navigation/nav-bar';
import { MainDiv } from '../../../components/styles-menu/main-styles/main.styles';
import Routing from '../routing/routing';
import Footer from '../../footer/footer';
import dummyPosts from '../blog/blog-posts-mock-data';


AOS.init({ once: true })


const styles = (theme: any) => ({});


const Home = (props: any) => {
  const { classes } = props;

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<string>('');
  const [blogPosts, setBlogPosts] = useState<string[]>([]);


  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "Chiropractic Advertising";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "Chiropractic Advertising - Blog";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const fetchBlogPosts = useCallback(() => {
    const blogPosts = dummyPosts.map((blogPost: any) => {
      let title = blogPost.title;
      title = title.toLowerCase();
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, " ");
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, "-");
      blogPost.url = `/blog/post/${title}`;
      blogPost.params = `?id=${blogPost.id}`;
      return blogPost;
    });
    setBlogPosts(blogPosts);
  }, [setBlogPosts]);



  useEffect(fetchBlogPosts, [fetchBlogPosts]);

  return (
    <MainDiv>
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        blogPosts={blogPosts}
        selectHome={selectHome}
        selectBlog={selectBlog}
      />
      <Footer />
    </MainDiv>
  )
}

export default withStyles(styles, { withTheme: true })(memo(Home));
