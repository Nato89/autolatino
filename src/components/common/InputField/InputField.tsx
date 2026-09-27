import styles from './InputField.module.css';

interface InputFieldProps {
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    options?: { value: string; label: string }[];
    required?: boolean;
    pattern?: string;
    maxLength?: number;
}

const InputField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    options,
    required,
    pattern,
    maxLength,
}: InputFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label>{label}</label>
            {type === 'select' ? (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                >
                    <option value="">Seleccionar</option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                ) : type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    pattern={pattern}
                    maxLength={maxLength}
                />
            )}
        </div>
    );
};

export default InputField;