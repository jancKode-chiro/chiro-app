import { Switch } from 'react-router-dom';
import PropsRoute from '../../../components/common/props-route/props-route';
import useLocationBlocker from '../../../utilities/location-blocker';
import Home from '../home';

const Routing = (props: any) => {
  const { selectHome } = props;
  console.log('routing', selectHome)
  useLocationBlocker();
  return (
    <Switch>
      {/* {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))} */}
      {/* <PropsRoute
        exact
        path="/blog"
        component={Blog}
        selectBlog={selectBlog}
        blogPosts={blogPosts}
      /> */}

      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  )
}

export default Routing
