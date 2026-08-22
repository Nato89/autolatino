import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ children, onClick, size = 'medium' }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[size]}`} onClick={onClick}>
        {children}
    </button>
  );
};

export default Button;