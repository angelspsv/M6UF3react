import './Input.css';

function Input(props){
    let text = props.texto;

    return (
        <span>
            <span>{text}</span>
            <input 
                value={props.valor}
                onChange={(e) => props.onCanvi(e.target.value)}
            />
            <br></br>
        </span>
    );
}

export default Input