import { ComponentProps } from "lib/component-props";

type FileItems = {
    file:{
        url:string
    },
    customImage: {
        field: {
          value: {
            src: string
            alt:string
          }
        }
    },
    description:{
        value:string
    },
    linkText:{
        value:string
    }
}

interface Fields {
    data: {
        datasource: {
            FileListName: string,
            FileLists: {
                FileDetails: FileItems[]
            },            
        }
    }
}
type FileListsProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: FileListsProps): JSX.Element => {    
    console.log(props.fields.data.datasource.FileLists.FileDetails);
    console.log(props.params.TitleHeadingLevel);
    return (
        <div className="main">
            File List Component
      </div>
    );
}