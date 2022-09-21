import styles from './css/LearningModule.module.css';

// Container for the learning module components that contain content
export default function LearningModule({ children }) {
  return (
    <div className={styles.learningModule}>
      { children }
    </div>
  )
}