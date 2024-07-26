import { ComponentProps } from 'lib/component-props';

type TagItem = {
  id: string;
  title: string;
};

interface Fields {
  tags: TagItem[];
  settings: {
    searchResultPage: {
      id: string;
      title: string;
      url: string;
    };
  };
}

type TagsProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: TagsProps): JSX.Element => {
  return (
    <div className='component tag-list col-12'>
      {props.fields.tags.map((tag, index) => (    
                <div className="tag-item" key={index}>
                   <span className="tag-links field-title">
                      <a href={`${props.fields.settings.searchResultPage.url}`+'#sxatags='+`${tag.title.replace(' ','+')}`}>
                      {tag.title}
                      </a>
                    </span>
                </div>
        )) }
    </div>
  );
};

export const Texts = (props: TagsProps): JSX.Element => {
   return (
    <div className='component tag-list col-12'>
    {props.fields.tags.map((tag, index) => (
          <div className="tag-item" key={index}>
             <span className="tag-text field-title">
               {tag.title}
              </span>
         </div>
      )) }
  </div>
  );
};
