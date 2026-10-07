import styles from './FileUploader.module.css';
import uploadIcon from '../../../assets/images/Iconos/upload.svg';
import paperclipIcon from '../../../assets/images/Iconos/paperclip.svg';
import { useRef } from 'react';

interface FileUploaderProps {
    files: File[];
    setFiles: (files: File[]) => void;
    maxFiles?: number;
}

const FileUploader = ({ files, setFiles, maxFiles = 5 }: FileUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles].slice(0, maxFiles));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles([...files, ...newFiles].slice(0, maxFiles));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    return (
        <div 
            className={styles.dropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
        >
            <img src={uploadIcon} alt="Subir" className={styles.uploadIcon} />
            <p>{files.length > 0 ? `${files.length} archivo(s) seleccionado(s)` : 'Arrastra las fotos aquí'}</p>
            <img src={paperclipIcon} alt="Buscar archivo" className={styles.paperclipIcon} />

            {files.length > 0 && (
                <ul className={styles.fileList}>
                    {files.map((f, index) => (
                        <li key={index} className={styles.fileItem}>
                            {f.name}
                            <button 
                                className={styles.removeFileBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(index);
                                }}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default FileUploader;