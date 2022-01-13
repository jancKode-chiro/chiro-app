import React, { memo, useState, useCallback } from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import { withStyles } from "@material-ui/core";


import smoothScrollTop from '../../../utilities/smooth-scroll-top';
import NavBar from '../navigation/nav-bar';
import { MainDiv } from './main.styles';
import Routing from '../routing/routing';
import Footer from '../../footer/footer';


AOS.init({ once: true })


const styles = (theme: any) => ({});


const Home = (props: any) => {
  const { classes } = props;

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<string>('');

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
        selectHome={selectHome}
      />
      <Footer />
    </MainDiv>
  )
}

export default withStyles(styles, { withTheme: true })(memo(Home));
