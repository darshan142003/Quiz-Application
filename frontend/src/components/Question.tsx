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
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 mx-auto my-6 border border-gray-200">

            <p className="text-gray-600 text-lg font-medium mb-2">
                Question {questionNumber} of {totalQuestions}
            </p>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">{text}</h3>

            <div className="space-y-4">
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
