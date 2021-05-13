/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { useState } from 'react';
import { SizeMe } from 'react-sizeme';

// used to ensure responsiveness of elements in SimpleBar component
export default function ResponsiveSimpleBar(props) {
    
    const [rowWidth, setRowWidth] = useState(null); // width of parent container
    const [contentWidth, setContentWidth] = useState(null); // width of child container

    // content is cut off by the simplebar component when statically defined as centered, this is a solution
    // If the child container is wider than It's parent container remove the centering of the child components/container
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
                    {setRowWidth(size.width)} {/* set rowWidth state to the current width of the content container */}
                    <SizeMe
                        monitorWidth
                        refreshRate={16}>
                        {({ size }) => 
                            <div className="d-flex">
                                {setContentWidth(size.width)} {/* set contentWidth state to the current width of the content inside the parent container */}
                                    {props.children} {/* render children between this components tags */}
                            </div>
                        }
                    </SizeMe>
                </div>
            }
        </SizeMe>
    );
}
