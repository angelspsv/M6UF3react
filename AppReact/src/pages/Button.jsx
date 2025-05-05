import './Button.css'

function Button(props){
    let text_boto = props.text;

    function saltaAlert(){
        alert('Botó premiat!');
    }

    return (
        <div>
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button