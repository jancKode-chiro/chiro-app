type StylesProps = {
  '@keyframes moveForever': {
    from: {
      transform: string;
    };
    to: {
      transform: string;
    };
  };
  parallax: {
    '& > use': {
      animation: string;
      animationDelay: any;
    };
  };
  root: {
    position: 'relative';
    width: '100%';
    marginBottom: -7;
    // height: '7vw';
    height: '100%';
    minHeight: '7vw';
  };
};

export const styles: StylesProps = {
  '@keyframes moveForever': {
    from: { transform: 'translate3d(-90px, 0, 0)' },
    to: { transform: 'translate3d(85px, 0, 0)' },
  },
  parallax: {
    '& > use': {
      animation: '$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite',
      animationDelay: (props: any) => `-${props.animationNegativeDelay}s`,
    },
  },
  root: {
    position: 'relative',
    width: '100%',
    marginBottom: -7,
    // height: '7vw',
    height: '100%',
    minHeight: '7vw',
  },
};
