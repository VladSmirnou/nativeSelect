import { useRef, useState, MouseEvent, useEffect, KeyboardEvent } from "react"
import styles from './Select.module.css';

type SelectPropsType = {
    elements: Array<string>
}

export const Select = ({ elements }: SelectPropsType) => {
    const [open, setOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(0);
    const [hoveredElement, setHoveredElement] = useState(0);

    const optionMenu = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open) {
            optionMenu.current?.focus();
        }
    }, [open]);

    const handleSetOpen = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.blur();
        setOpen(prev => !prev);
    };

    const selectOptions = elements.map((el, idx) => {
        const handleSetSelectedOptionIdx = () => {
            setSelectedElement(idx);
            setOpen(false);
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

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        // hovering over a list of menus
        // immediately after it opened will set 'hoveredElement' to 2 (for 3
        // elements in the list), and if the 'selectedElement' value is 0,
        // then pressing 'ArrowUp' won't do anything. So I always
        // want to move from the hovered element.

        if (e.key === 'Tab') {
            setSelectedElement(hoveredElement);
            setOpen(false);
        } else {
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
                return;
            } else if (hoveredElement === 0 && e.key === 'ArrowUp') {
                return;
            } else if (hoveredElement === elements.length - 1 && e.key === 'ArrowDown') {
                return;
            } else {
                let newIdx: number;
                if (e.key === 'ArrowUp') {
                    newIdx = hoveredElement - 1
                } else {
                    newIdx = hoveredElement + 1
                }
                setSelectedElement(newIdx);
                setHoveredElement(newIdx);
            }
        }
        return;
    }

    return (
        <div>
            {open ? (
                <div>
                    {elements[selectedElement]} 123
                </div>
            ) : (
                <div
                    tabIndex={0}
                    onClick={handleSetOpen}
                    onKeyDown={handleKeyDown}
                >
                    {elements[selectedElement]} 321
                </div>
                )
            }
            {
                open &&
                <div
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    ref={optionMenu}
                    style={s}
                    onBlur={() => {
                        setOpen(false);
                        setHoveredElement(selectedElement);
                    }}
                >
                    {selectOptions}
                </div>
            }
        </div>
    )
}
