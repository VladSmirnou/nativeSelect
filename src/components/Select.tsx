import { useRef, useState, MouseEvent, useEffect, KeyboardEvent } from "react"
import styles from './Select.module.css';

type SelectPropsType = {
    elements: Array<string>
}

export const Select = ({ elements }: SelectPropsType) => {
    const [wrapped, setWrapped] = useState(true);
    const [selectedElement, setSelectedElement] = useState(0);
    const [hoveredElement, setHoveredElement] = useState(0);

    const optionMenu = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!wrapped) {
            optionMenu.current?.focus();
        }
    }, [wrapped]);

    const handleSetWrapped = (e: MouseEvent<HTMLDivElement>) => {
        setWrapped(prev => !prev);
        e.currentTarget.blur();
    };

    const selectOptions = elements.map((el, idx) => {
        const handleSetSelectedOptionIdx = () => {
            setSelectedElement(idx);
            setWrapped(true);
        }
        return (
            <div
                className={hoveredElement === idx ? styles.hoveredElement : ''}
                key={idx}
                onClick={handleSetSelectedOptionIdx}
                onMouseEnter={() => setHoveredElement(idx)}
            >
                {el}
            </div>
        )
    })

    const s = {
        border: '2px solid black',
        width: 'fit-content'
    }

    const element = 
    <div
        tabIndex={0}
        onClick={handleSetWrapped}
    >
        {elements[selectedElement]}
    </div>;

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') {
            setSelectedElement(hoveredElement);
            setWrapped(true);
        }
    }

    return (
        <div>
            {element}
            {!wrapped && <div tabIndex={0} onKeyDown={handleKeyDown} ref={optionMenu} style={s}>{selectOptions}</div>}
        </div>
    )
}
