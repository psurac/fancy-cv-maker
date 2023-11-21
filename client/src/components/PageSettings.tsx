import { FC, useState } from "react";

type PageSettingsType = {
    numFildsProfileBox: number;
    setNumFilesProfileBox: React.Dispatch<React.SetStateAction<number>>;
    numBoxesSide: number;
    setNumBoxesSide: React.Dispatch<React.SetStateAction<number>>;
    numBoxesMain: number;
    setNumBoxesMain: React.Dispatch<React.SetStateAction<number>>
    className?: string;
};

const PageSettings: FC<PageSettingsType> = ( props ) => {
    const [showeSettings, setShoweSettings] = useState<boolean>(false);

    return (
        <div
            className={props.className}
            onMouseEnter={() => setShoweSettings(true)}
            onMouseLeave={() => setShoweSettings(false)}
        >
            <div>Settings</div>
            {showeSettings &&
                <>
                    {Object.entries(props).map(([key,value], i) => (
                        typeof(value) === 'number' &&
                            <div key={i} className="page-setting-setter">
                                <label htmlFor={key}>
                                    <input
                                        id={key}
                                        type="number"
                                        value={value}
                                        min="1"
                                        max={key = 'numFildsProfileBox' ? 2 : 10}
                                        onChange={(e) => {
                                            const nextValue = Object.values(props)[i+1];
                                            if (typeof nextValue === 'function' && 'call' in nextValue) {
                                                nextValue(+e.target.value);
                                            }
                                        }} />
                                </label>
                            </div>
                    ))}
                </>
            }
        </div>
    );
};

export default PageSettings;