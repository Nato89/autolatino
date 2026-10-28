import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = ({ children, onClick, size = 'medium', disabled }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[size]}`} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  );
};

export default Button;