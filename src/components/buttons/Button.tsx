import styles from './Button.module.css'

type ButtonProps = {
    label: string
    type?: 'button' | 'submit' | 'reset'
    class?: string
}

const Button = (props: ButtonProps) => {
    return (
        <button className={`${styles.button} ${props.class}`} type={props.type}>{props.label}</button>
    )
}
export default Button