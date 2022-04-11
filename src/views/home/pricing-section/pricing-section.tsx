import React, { useState } from "react";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import { styles } from "../../../components/styles-menu/pricing-section-styles/pricing-section.styles";
import calculateSpacing from "../../../utilities/calculate-spacing";
import PriceCard from "../price-card/price-card";

const PricingSection = (props: any) => {
  const [selectedPrice, setSelectedPrice] = useState('')


  const onChangeHandler = (setPrice: any) => {
    console.log('setPrice', setPrice)
    setSelectedPrice(setPrice)
  }

  const { width, classes } = props;
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Pricing
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <div onClick={onChangeHandler}>
          <Grid
            container
            spacing={calculateSpacing(width)}
            className={classes.gridContainer}
          >
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              className={classes.cardWrapper}
              data-aos="zoom-in-up"
            >

              <PriceCard
                title="Starter"
                pricing={
                  <span>
                    $14.99
                    <Typography display="inline"> / month</Typography>
                  </span>
                }
                features={["Feature 1", "Feature 2", "Feature 3"]}
              />
            </Grid>
            <Grid
              item
              className={classes.cardWrapperHighlighted}
              xs={12}
              sm={6}
              lg={3}
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >

              <PriceCard
                highlighted
                title="Premium"
                pricing={
                  <span>
                    $29.99
                    <Typography display="inline"> / month</Typography>
                  </span>
                }
                features={["Feature 1", "Feature 2", "Feature 3"]}
              />
            </Grid>
            <Grid
              item
              className={classes.cardWrapper}
              xs={12}
              sm={6}
              lg={3}
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
            >
              <PriceCard
                title="Business"
                pricing={
                  <span>
                    $49.99
                    <Typography display="inline"> / month</Typography>
                  </span>
                }
                features={["Feature 1", "Feature 2", "Feature 3"]}
              />
            </Grid>
            <Grid
              item
              className={classes.cardWrapper}
              xs={12}
              sm={6}
              lg={3}
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUp("md", width) ? "600" : "200"}
            >
              <PriceCard
                title="Tycoon"
                pricing={
                  <span>
                    $99.99
                    <Typography display="inline"> / month</Typography>
                  </span>
                }
                features={["Feature 1", "Feature 2", "Feature 3"]}
              />

            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}


export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
