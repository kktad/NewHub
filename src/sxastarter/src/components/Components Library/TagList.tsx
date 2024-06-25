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
type TabsProps = ComponentProps & {
  fields: Fields;
};

const tagsLabel = 'Tags: ';
const linkLabel = 'Link: ';

export const Default = (props: TabsProps): JSX.Element => {
  console.log('Props: ', props);

  return (
    <div>
      <hr />
      Tag List Component - Links Variant
      <br />
      <br />
      <div>{tagsLabel}</div>
      {props.fields.tags.map((tag, index) => (
        <div className="tag-listing-links" key={index}>
          {tag.title}
        </div>
      ))}
      <br />
      <br />
      <div>{linkLabel}</div>
      <a href={`${props.fields.settings.searchResultPage.url}`}>
        {props.fields.settings.searchResultPage.title}
      </a>
    </div>
  );
};

export const Texts = (props: TabsProps): JSX.Element => {
  console.log('Props: ', props);

  return (
    <div>
      <hr />
      Tag List Component - Texts Variant
      <br />
      <br />
      <div>{tagsLabel}</div>
      {props.fields.tags.map((tag, index) => (
        <div className="tag-listing-texts" key={index}>
          {tag.title}
        </div>
      ))}
    </div>
  );
};
