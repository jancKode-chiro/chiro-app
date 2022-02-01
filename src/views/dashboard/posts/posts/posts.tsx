import React, { useState, useCallback, useEffect } from "react";
import PostContent from "../post-content/post-content";
import AddPost from "../add-post/add-post";
function Posts(props: any) {
  const {
    selectPosts,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    setPosts,
  } = props;
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);

  // useEffect(() => {
  //   selectPosts();
  // }, [selectPosts]);

  if (isAddPostPaperOpen) {
    return <AddPost
      onClose={closeAddPostModal}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <PostContent
    openAddPostModal={openAddPostModal}
    posts={posts}
    setPosts={setPosts}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}
export default Posts;
