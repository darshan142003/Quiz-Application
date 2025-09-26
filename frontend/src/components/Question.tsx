import Option from "./Options";


interface OptionType {
    id: number;
    text: string;
}

interface QuestionProps {
    questionId: number;
    text: string;
    options?: OptionType[];
    selectedOptions: { questionId: number; optionId: number }[];
    onOptionClick: (questionId: number, optionId: number) => void;
    questionNumber: number;
    totalQuestions: number;
}

export default function Question({
    questionId,
    text,
    options,
    selectedOptions,
    onOptionClick,
    questionNumber,
    totalQuestions,
}: QuestionProps) {
    return (
        <div className="w-full max-w-xl bg-gray-800 text-white rounded-lg shadow-lg p-6">
            <p className="text-lg font-medium mb-4">
                Question {questionNumber} of {totalQuestions}
            </p>
            <h3 className="text-xl mb-6">{text}</h3>

            <div className="space-y-3">
                {options?.map((o) => {
                    const selected = selectedOptions.find(
                        (a) => a.questionId === questionId && a.optionId === o.id
                    );
                    return (
                        <Option
                            key={o.id}
                            text={o.text}
                            selected={!!selected}
                            onClick={() => onOptionClick(questionId, o.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
