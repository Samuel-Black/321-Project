/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { withSize } from 'react-sizeme';

// child component used by Responsive SimpleBar parent component to ensure responsiveness of items in SimpleBar component
function ChildComponent (props) {

    return (
        <div className="d-flex">
            {props.children}
        </div>
    );
}
  
export default withSize()(ChildComponent);
