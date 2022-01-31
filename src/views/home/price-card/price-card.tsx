
import React from 'react'
import { Typography, Box, withStyles } from "@material-ui/core";
import { styles } from '../../../components/styles-menu/price-card-styles/price-card.styles';
import CheckIcon from "@material-ui/icons/Check";

const PriceCard = (props: any) => {
  const { classes, theme, title, pricing, features, highlighted } = props;
  return (
    <div className={highlighted ? classes.cardHightlighted : classes.card}>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h5" : "h6"}
          className={highlighted ? "text-white" : classes.title}
        >
          {title}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h3" : "h4"}
          className={highlighted ? "text-white" : ''}
        >
          {pricing}
        </Typography>
      </Box>
      {features.map((feature: string, index: string) => (
        <Box display="flex" alignItems="center" mb={1} key={index}>
          <CheckIcon
            style={{
              color: highlighted
                ? theme.palette.common.white
                : theme.palette.primary.dark
            }}
          />
          <Box ml={1}>
            <Typography
              className={highlighted ? "text-white" : ''}
              variant={highlighted ? "h6" : "body1"}
            >
              {feature}
            </Typography>
          </Box>
        </Box>
      ))}
    </div>
  );
}


export default withStyles(styles, { withTheme: true })(PriceCard);
