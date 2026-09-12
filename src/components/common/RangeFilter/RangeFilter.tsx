import styles from './RangeFilter.module.css';

interface RangeFilterProps {
    label: string;
    min: number;
    max: number;
    step: number;
    minDistance: number;
    value: { min: number; max: number };
    onChange: (newValue: { min: number; max: number }) => void;
    formatValue: (value: number) => string;
}

const RangeFilter = ({
    label,
    min,
    max,
    step,
    minDistance,
    value,
    onChange,
    formatValue
}: RangeFilterProps) => {
    return (
        <div className={styles.rangeFilter}>
            <label>{label}</label>
            <div className={styles.rangeLabels}>
                <span>{formatValue(value.min)}</span>
                <span>{formatValue(value.max)}</span>
            </div>
            <div className={styles.rangeContainer}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value.min}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= value.max - minDistance) {
                            onChange({ ...value, min: val });
                        }
                    }}
                    className={styles.rangeMin}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value.max}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= value.min + minDistance) {
                            onChange({ ...value, max: val });
                        }
                    }}
                    className={styles.rangeMax}
                />
            </div>
        </div>
    );
};

export default RangeFilter;