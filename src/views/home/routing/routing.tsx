import { Switch } from 'react-router-dom';
import PropsRoute from '../../../components/common/props-route/props-route';
import useLocationBlocker from '../../../utilities/location-blocker';
import Home from '../home';
import BlogPost from '../../blog/blog-post/blog-post';
import Blog from '../blog/blog';
import dummyPost from '../blog/blog-posts-mock-data'

const Routing = (props: any) => {
  const { blogPosts, selectBlog, selectHome } = props;
  console.log('blogPosts', blogPosts)
  console.log('routing', selectBlog)
  useLocationBlocker();
  return (
    <Switch>
      {dummyPost.map((post: any) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost: any) => blogPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={dummyPost}
      />

      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  )
}

export default Routing
