/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { useState } from 'react';
import { SizeMe } from 'react-sizeme';

export default function ResponsiveSimpleBar(props) {
    
    const [rowWidth, setRowWidth] = useState(null); // used to ensure responsiveness of elements in SimpleBar component
    const [contentWidth, setContentWidth] = useState(null); // used to ensure responsiveness of elements in SimpleBar component

    // content is cut off by the simplebar component when statically defined as centered, this is a solution
    function SetRowJustification() { 
        if(contentWidth > rowWidth && (contentWidth != null || rowWidth != null)) {
            return '';
        } else
            return 'justify-content-center';
    }

    return(
        <SizeMe
            monitorWidth
            refreshRate={16}>
            {({ size }) => 
                <div className={`row ${SetRowJustification()}`}>
                    {setRowWidth(size.width)}
                    <SizeMe
                        monitorWidth
                        refreshRate={16}>
                        {({ size }) => 
                            <div className="d-flex">
                                {setContentWidth(size.width)}
                                    {props.children}
                            </div>
                        }
                    </SizeMe>
                </div>
            }
        </SizeMe>
    );
}
