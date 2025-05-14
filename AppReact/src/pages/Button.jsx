import './Button.css'

function Button(props){
    let text_boto = props.text;
    //per props el component boto reb la funcio i text que executa
    return (
        <div>
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button