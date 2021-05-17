/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { useState } from 'react';
import { withSize } from 'react-sizeme';
import ChildComponent from './Child-Component';

// Parent component which renders is aware of it's own size and the ChildComponent's size;
// used to ensure SimpleBar component is responsive
function ParentComponent(props) {
    
    const parentWidth = props.size.width; // this components width
    const[childWidth, setChildWidth] = useState(0); // ChildComponent width

    const onSize = (size) => { // set ChildComponentWidth
        setChildWidth(size.width);
    }

    function SetRowJustification() { // if ChildComponent > ParentComponent width, do not center as content is cut off from the left.
        if(childWidth > parentWidth && (childWidth != 0 || parentWidth != 0)) {
            return ''; 
        } else
            return 'justify-content-center';
    }

    return (
        <div className={`row ${SetRowJustification()}`}>
            <ChildComponent onSize={onSize} children={props.children} />
        </div>
    );
}
  
export default withSize()(ParentComponent);
