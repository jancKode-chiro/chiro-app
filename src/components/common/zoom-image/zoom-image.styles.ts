export const styles = (theme: any) => ({
  backdrop: {
    zIndex: theme.zIndex.modal,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  portalImgWrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: theme.zIndex.modal,
    cursor: 'pointer',
  },
  portalImgInnerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  portalImg: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  zoomedOutImage: {
    cursor: 'pointer',
  },
});
