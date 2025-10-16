import { useEffect, useState } from "react";
import { useQuestions } from "../../providers/questions_provider";
import { useCategories } from "../../providers/categories_provider";
import './FetchButton.css'

export const FetchButton: React.FC = () => {
    const {
        load: loadQuestions,
    } = useQuestions();

    const { selectCategory } = useCategories();

    /* Track disable/unable countdown timer for the button. 
    We need a timer because when fetches occur too often, API sends a error. */
    const [secondsLeft, setSecondsLeft] = useState(0);

    const handleClick = () => {
        setSecondsLeft(5);
    }

    useEffect(() => {
        // Exit if countdown has finished.
        if (secondsLeft === 0) return;

        // Start interval that decrements timer every 1 second.
        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);

        return () => { clearInterval(interval) };
    }, [secondsLeft]);

    return (
        <div className="btn-container">
            <button
                className="btn-grad"
                disabled={secondsLeft > 0}
                onClick={async () => {
                    handleClick();
                    selectCategory(NaN);
                    await loadQuestions(50);
                }} >
                {/* Show countdown while disabled, otherwise "Fetch" */}
                {secondsLeft > 0 ?
                    `Fetch in ${secondsLeft}...` :
                    "Fetch"
                }
            </button>
        </div>
    );
}