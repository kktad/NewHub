import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const phKey = `snippet-1-${props.params.DynamicPlaceholderId}`;
  return (
    <div className='snippet-wrapper component container-default'>
      <div className="component-content">     
        <Placeholder name={phKey} rendering={props.rendering}/>  
      </div>         
    </div>

)};
