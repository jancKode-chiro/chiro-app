import {
  ReactElement,
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';


type TemplateProps = {
  title: string;
  content: string
  setTemplateTitle: (title: string) => void;
  setTemplateContent: (content: string) => void;

};

const TemplateContext = createContext({});

const TemplateProvider = (props: any): ReactElement => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')


  const setTemplateTitle = (title: string): void => {
    setTitle(title!);
  };

  const setTemplateContent = (content: string): void => {
    setContent(content!)
  }

  useEffect(() => {
    console.log('context template', title)
    console.log('context template', content)
  }, [title, content])


  const values: TemplateProps = {
    title,
    content,
    setTemplateTitle,
    setTemplateContent


  };

  return <TemplateContext.Provider value={values} {...props} />;
};

const useTemplate = (): TemplateProps => useContext(TemplateContext) as TemplateProps;

export { TemplateProvider, useTemplate };
