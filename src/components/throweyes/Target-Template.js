import Target from './Target'

export default function TargetTemplate(props) {

    return (
        <div className="row justify-content-center">
            {props.targets.map((target, i) => ( 
            <div key={i} class="col-2">
                <div className="d-flex justify-content-center">
                    {target == true ?  <a onClick={() => props.winCondition(i+1)}> <Target image={props.image} targetID={props.targetID} /> </a> : <span></span> }
                </div>
            </div>
            ))}
        </div>
    );

}