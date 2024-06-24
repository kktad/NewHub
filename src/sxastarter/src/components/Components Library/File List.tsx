import React from "react";
import { ComponentProps } from "lib/component-props";
import ModalImage from "react-modal-image"; // Import react-modal-image package
import download from "downloadjs"; // Import downloadjs for file downloads

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

const FileListsComponent: React.FC<FileListsProps> = (props) => {
    console.log(props.fields.data.datasource.FileLists.FileDetails);

    const handleDownload = (imageUrl: string, fileName: string) => {
        // Use downloadjs to initiate the download
        download(imageUrl, fileName);
    };

    return (
        <div className="main">
            {/* Render your file list items */}
            <p className="example-text">Example file list</p>
            {props.fields.data.datasource.FileLists.FileDetails.map((fileItem, index) => (
                <div key={index} className="file-item">
                    {/* Display thumbnail */}
                    <ModalImage
                        small="https://aautio.github.io/react-modal-image/example_img_small.jpg" // Thumbnail image
                        large="https://aautio.github.io/react-modal-image/example_img_small.jpg" // Full-size image URL
                        alt={fileItem.customImage.field.value.alt} // Alt text for accessibility
                        hideDownload={true} // Hide default download button from ModalImage
                        hideZoom={true} // Hide default zoom button from ModalImage
                        className="thumbnail"
                    />
                    {/* Download button */}
                    <button
                        onClick={() => handleDownload(fileItem.file.url, fileItem.customImage.field.value.alt)}
                        className="download-btn"
                    >
                        {fileItem.linkText.value}  {/* Display filename or customize as needed */}
                    </button>
                    
                    <p>{fileItem.description.value}</p>
                </div>
            ))}
        </div>
    );
};

export default FileListsComponent;
