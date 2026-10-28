import styles from "../../../styles/form.module.css"

interface CampoProps{
    label: string;
    name: string;
    value: string; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    placeholder?: string;
}

export function Campo({label, name, value, onChange, type="text", placeholder, required=false}: CampoProps){
    return(
        <label className={styles.label}>
            {label}
            <input className={styles.campo}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required} />
        </label>
    )
} 