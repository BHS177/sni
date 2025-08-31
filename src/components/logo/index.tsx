import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { Link, type LinkProps } from "react-router-dom";
import styles from './styles.module.scss';

type PropsType = Omit<LinkProps, 'to'>;

export default function Logo(props: PropsType) {
    return (
        <Link to="/" {...props} className={`${styles.root} ${props.className}`}>
            <div className={styles.icon}>
                <VideoCameraIcon />
            </div>
            <p className={styles.text}>
                    SNIPPO
                <small className="hidden sm:block">
                    AI Video Editor
                </small>
            </p>
        </Link>
    )
}